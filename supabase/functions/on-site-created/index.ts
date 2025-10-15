import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to replace placeholders
function replacePlaceholders(htmlContent: string, data: Record<string, string | undefined>): string {
  let result = htmlContent;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const placeholder = new RegExp(`{{${key.toUpperCase()}}}`, 'g');
      result = result.replace(placeholder, data[key] || '');
    }
  }
  return result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  console.log("Edge Function 'on-site-created' invoked by database trigger.");

  try {
    const payload = await req.json();
    const newSite = payload.record; // The new row inserted into 'sites' table

    console.log("New site record received:", JSON.stringify(newSite));

    if (!newSite || !newSite.id || !newSite.subdomain || !newSite.user_id) {
      console.error("Error: Invalid site payload received from trigger.");
      return new Response(JSON.stringify({ error: 'Invalid site payload' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Initialize Supabase client for database operations within the Edge Function
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Extract data from the new site record
    const {
      id: siteId,
      user_id: userId,
      subdomain,
      title: companyName,
      description: activityDescription,
      primary_color: primaryColor,
      site_type: siteType,
      plan,
      content: formDataContent // This is the JSONB content from the insert
    } = newSite;

    const { selectedTemplateId, firstName, lastName, phoneNumber } = formDataContent || {};

    // --- Template Selection and Customization ---
    let templateFileName = '';
    switch (selectedTemplateId) {
      case 'ecommerce-luxury':
        templateFileName = 'samira_shop_v2.html';
        break;
      case 'ecommerce-basic':
        templateFileName = 'Template de vente.html';
        break;
      case 'portfolio-basic':
        templateFileName = 'Portfolio_vente/index.html';
        break;
      // Add more cases for other templates
      default:
        console.warn(`No specific template found for ID: ${selectedTemplateId}. Using a generic one.`);
        // Fallback to a very basic template if no match
        templateFileName = 'generic.html'; // You might want to create a generic.html
        break;
    }

    let templateContent = '';
    if (templateFileName === 'generic.html') {
      templateContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>{{COMPANY_NAME}}</title>
          <style>
            body { font-family: sans-serif; margin: 0; background-color: #f0f0f0; color: #333; }
            .hero { background-color: {{PRIMARY_COLOR}}; color: white; padding: 60px 20px; text-align: center; }
            .hero h1 { font-size: 3em; margin-bottom: 20px; }
            .hero p { font-size: 1.2em; }
            .content { padding: 40px 20px; max-width: 800px; margin: 0 auto; }
            .contact { background-color: #eee; padding: 40px 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="hero">
            <h1>{{COMPANY_NAME}}</h1>
            <p>{{ACTIVITY_DESCRIPTION}}</p>
          </div>
          <div class="content">
            <h2>Nos Services</h2>
            <p>Découvrez ce que nous faisons pour vous.</p>
          </div>
          <div class="contact">
            <h2>Contactez-nous</h2>
            <p>Email: contact@{{SUBDOMAIN}}.ctcsite.com</p>
            <p>Téléphone: {{PHONE_NUMBER}}</p>
          </div>
        </body>
        </html>
      `;
    } else {
      // Fetch template from Supabase Storage
      const { data: templateData, error: fetchError } = await supabaseAdmin.storage
        .from('site-templates')
        .download(templateFileName);

      if (fetchError) {
        console.error(`Error fetching template ${templateFileName} from storage:`, fetchError);
        // Fallback to generic template if specific template not found
        templateContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{{COMPANY_NAME}}</title>
            <style>
              body { font-family: sans-serif; margin: 0; background-color: #f0f0f0; color: #333; }
              .hero { background-color: {{PRIMARY_COLOR}}; color: white; padding: 60px 20px; text-align: center; }
              .hero h1 { font-size: 3em; margin-bottom: 20px; }
              .hero p { font-size: 1.2em; }
              .content { padding: 40px 20px; max-width: 800px; margin: 0 auto; }
              .contact { background-color: #eee; padding: 40px 20px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="hero">
              <h1>{{COMPANY_NAME}}</h1>
              <p>{{ACTIVITY_DESCRIPTION}}</p>
            </div>
            <div class="content">
              <h2>Nos Services</h2>
              <p>Découvrez ce que nous faisons pour vous.</p>
            </div>
            <div class="contact">
              <h2>Contactez-nous</h2>
              <p>Email: contact@{{SUBDOMAIN}}.ctcsite.com</p>
              <p>Téléphone: {{PHONE_NUMBER}}</p>
            </div>
          </body>
          </html>
        `;
      } else {
        templateContent = await templateData.text();
      }
    }

    // Prepare data for placeholder replacement
    const dataToReplace = {
      COMPANY_NAME: companyName,
      ACTIVITY_DESCRIPTION: activityDescription,
      PRIMARY_COLOR: primaryColor,
      PRIMARY_COLOR_ENCODED: encodeURIComponent(primaryColor || '#3b82f6'), // For SVG background
      FIRST_NAME: firstName,
      LAST_NAME: lastName,
      PHONE_NUMBER: phoneNumber,
      WHATSAPP_LINK: `https://wa.me/${phoneNumber?.replace(/\D/g, '')}`, // Clean phone number for WhatsApp link
      FACEBOOK_LINK: newSite.facebook_link || '#', // Assuming these might come from newSite or be default
      INSTAGRAM_LINK: newSite.instagram_link || '#',
      TWITTER_LINK: newSite.twitter_link || '#',
      LINKEDIN_LINK: newSite.linkedin_link || '#',
      LOGO_URL: newSite.logo_url || '/placeholder.svg', // Placeholder for logo
      COVER_IMAGE_URL: newSite.cover_image_url || '/placeholder.svg', // Placeholder for cover image
      ABOUT_IMAGE_URL: newSite.about_image_url || '/placeholder.svg', // Placeholder for about image
      SUBDOMAIN: subdomain,
      // Add more data fields as needed
    };

    let finalHtmlContent = replacePlaceholders(templateContent, dataToReplace);

    // 2. Store the generated site files in Supabase Storage
    const filePath = `${subdomain}/index.html`;
    console.log(`Attempting to upload file to public-sites/${filePath}`);
    const { error: uploadError } = await supabaseAdmin.storage
      .from('public-sites')
      .upload(filePath, finalHtmlContent, {
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
        cover_image_url: publicSiteUrl, // Use the generated site's URL as cover for now
        last_updated_at: new Date().toISOString(),
        whatsapp_link: `https://wa.me/${phoneNumber?.replace(/\D/g, '')}`,
      })
      .eq('id', siteId)
      .eq('user_id', userId);

    if (updateError) {
      console.error("Error updating site status in DB:", updateError);
      return new Response(JSON.stringify({ error: 'Failed to update site status: ' + updateError.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }
    console.log("Site status updated successfully in DB.");


    return new Response(JSON.stringify({ message: 'Site generated and published successfully via trigger!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Edge Function 'on-site-created' unexpected error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});