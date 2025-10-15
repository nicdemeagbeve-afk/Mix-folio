import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  console.log("Edge Function 'generate-site' invoked.");
  console.log("SUPABASE_URL loaded:", !!Deno.env.get('SUPABASE_URL'));
  console.log("SUPABASE_SERVICE_ROLE_KEY loaded:", !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));


  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    console.error("Error: Missing Authorization header.");
    return new Response('Unauthorized', {
      status: 401,
      headers: corsHeaders
    })
  }

  const token = authHeader.replace('Bearer ', '')
  // In a real scenario, you would verify this token to get the user ID
  // For example, using a library like 'jose' or a Supabase method if available in Deno context.
  // const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  // if (userError || !user) { ... }

  let requestBody;
  try {
    requestBody = await req.json();
    console.log("Request body received:", JSON.stringify(requestBody));
  } catch (jsonError) {
    console.error("Error parsing request JSON:", jsonError);
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  try {
    const {
      companyName,
      activityDescription,
      siteType,
      primaryColor,
      selectedTemplateId,
      subdomain,
      plan,
      firstName,
      lastName,
      phoneNumber,
      userId // Expecting userId from frontend
    } = requestBody;

    if (!userId) {
      console.error("Error: userId is missing in the request body.");
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    if (!subdomain) {
      console.error("Error: subdomain is missing in the request body.");
      return new Response(JSON.stringify({ error: 'Subdomain is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    // Add more validation for other critical fields if necessary

    // Initialize Supabase client for database operations within the Edge Function
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // For demonstration, let's assume a simple HTML structure
    let siteContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName || 'Mon Site'}</title>
        <style>
          body { font-family: sans-serif; margin: 0; background-color: #f0f0f0; color: #333; }
          .hero { background-color: ${primaryColor || '#3b82f6'}; color: white; padding: 60px 20px; text-align: center; }
          .hero h1 { font-size: 3em; margin-bottom: 20px; }
          .hero p { font-size: 1.2em; }
          .content { padding: 40px 20px; max-width: 800px; margin: 0 auto; }
          .contact { background-color: #eee; padding: 40px 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="hero">
          <h1>${companyName || 'Bienvenue !'}</h1>
          <p>${activityDescription || 'Votre description ici.'}</p>
        </div>
        <div class="content">
          <h2>Nos Services</h2>
          <p>Découvrez ce que nous faisons pour vous.</p>
          <!-- Add more dynamic content based on siteType and features -->
        </div>
        <div class="contact">
          <h2>Contactez-nous</h2>
          <p>Email: contact@${subdomain}.ctcsite.com</p>
          <p>Téléphone: ${phoneNumber || 'Non spécifié'}</p>
          <!-- Add social links if provided -->
        </div>
      </body>
      </html>
    `;

    // 2. Store the generated site files in Supabase Storage
    const filePath = `${subdomain}/index.html`;
    console.log(`Attempting to upload file to public-sites/${filePath}`);
    const { error: uploadError } = await supabaseAdmin.storage
      .from('public-sites')
      .upload(filePath, siteContent, {
        contentType: 'text/html',
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading site to storage:", uploadError);
      return new Response(JSON.stringify({ error: 'Failed to upload site files: ' + uploadError.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }
    console.log("Site files uploaded successfully.");

    // 3. Update the site status in the database
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('public-sites')
      .getPublicUrl(filePath);

    const publicSiteUrl = publicUrlData?.publicUrl;
    console.log("Public site URL:", publicSiteUrl);

    console.log(`Attempting to update site in 'sites' table for subdomain: ${subdomain}`);
    const { error: updateError } = await supabaseAdmin
      .from('sites')
      .update({
        status: 'online',
        cover_image_url: publicSiteUrl,
        last_updated_at: new Date().toISOString(),
        plan: plan,
        site_type: siteType,
        title: companyName,
        description: activityDescription,
        primary_color: primaryColor,
        whatsapp_link: `https://wa.me/${phoneNumber}`,
        // Ensure user_id is set if it's a new site, or used for update condition
        // For update, we use subdomain and user_id to ensure correct site is updated
      })
      .eq('subdomain', subdomain)
      .eq('user_id', userId); // Crucial for RLS and ownership

    if (updateError) {
      console.error("Error updating site status in DB:", updateError);
      return new Response(JSON.stringify({ error: 'Failed to update site status: ' + updateError.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }
    console.log("Site status updated successfully in DB.");

    return new Response(JSON.stringify({ message: 'Site generated and published successfully!', url: publicSiteUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Edge Function unexpected error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});