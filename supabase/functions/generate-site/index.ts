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

      // IMPORTANT: Authentication must be handled manually as verify_jwt is false by default
      const authHeader = req.headers.get('Authorization')
      if (!authHeader) {
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
          phoneNumber
        } = await req.json();

        // Initialize Supabase client for database operations within the Edge Function
        const supabaseAdmin = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Fetch template structure (conceptual)
        // In a real app, you'd fetch a base HTML/CSS/JS structure for the selectedTemplateId
        // from Supabase Storage or a database table.
        // const { data: templateData, error: templateError } = await supabaseAdmin
        //   .from('templates')
        //   .select('structure')
        //   .eq('id', selectedTemplateId)
        //   .single();
        // if (templateError) { ... }
        // let siteContent = templateData.structure;

        // For demonstration, let's assume a simple HTML structure
        let siteContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${companyName}</title>
            <style>
              body { font-family: sans-serif; margin: 0; background-color: #f0f0f0; color: #333; }
              .hero { background-color: ${primaryColor}; color: white; padding: 60px 20px; text-align: center; }
              .hero h1 { font-size: 3em; margin-bottom: 20px; }
              .hero p { font-size: 1.2em; }
              .content { padding: 40px 20px; max-width: 800px; margin: 0 auto; }
              .contact { background-color: #eee; padding: 40px 20px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="hero">
              <h1>${companyName}</h1>
              <p>${activityDescription}</p>
            </div>
            <div class="content">
              <h2>Nos Services</h2>
              <p>Découvrez ce que nous faisons pour vous.</p>
              <!-- Add more dynamic content based on siteType and features -->
            </div>
            <div class="contact">
              <h2>Contactez-nous</h2>
              <p>Email: contact@${subdomain}.ctcsite.com</p>
              <p>Téléphone: ${phoneNumber}</p>
              <!-- Add social links if provided -->
            </div>
          </body>
          </html>
        `;

        // 2. Store the generated site files in Supabase Storage
        // Create a unique path for the site, e.g., 'sites/monentreprise/index.html'
        const filePath = `${subdomain}/index.html`;
        const { error: uploadError } = await supabaseAdmin.storage
          .from('public-sites') // Assuming you have a bucket named 'public-sites'
          .upload(filePath, siteContent, {
            contentType: 'text/html',
            upsert: true, // Overwrite if exists
          });

        if (uploadError) {
          console.error("Error uploading site to storage:", uploadError);
          return new Response(JSON.stringify({ error: 'Failed to upload site files' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          });
        }

        // 3. Update the site status in the database
        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('public-sites')
          .getPublicUrl(filePath);

        const publicSiteUrl = publicUrlData?.publicUrl;

        const { error: updateError } = await supabaseAdmin
          .from('sites')
          .update({
            status: 'online',
            cover_image_url: publicSiteUrl, // Using this to store the main site URL for now
            last_updated_at: new Date().toISOString(),
            plan: plan, // Update plan
            site_type: siteType, // Update site type
            title: companyName, // Ensure title is updated
            description: activityDescription, // Ensure description is updated
            primary_color: primaryColor, // Ensure primary color is updated
            whatsapp_link: `https://wa.me/${phoneNumber}`, // Example: auto-generate whatsapp link
            // Add other fields as needed
          })
          .eq('subdomain', subdomain); // Assuming subdomain is unique and used for lookup

        if (updateError) {
          console.error("Error updating site status in DB:", updateError);
          return new Response(JSON.stringify({ error: 'Failed to update site status' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          });
        }

        return new Response(JSON.stringify({ message: 'Site generated and published successfully!', url: publicSiteUrl }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });

      } catch (error) {
        console.error("Edge Function error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }
    });