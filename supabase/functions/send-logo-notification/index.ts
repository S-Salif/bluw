import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id, order_data } = await req.json();

    // Get complete order details from database
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: order, error } = await supabaseService
      .from("logo_orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (error || !order) {
      throw new Error("Order not found");
    }

    const formatPrice = (amount: number) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount / 100);
    };

    const formatArray = (arr: string[] | null) => {
      return arr && arr.length > 0 ? arr.join(', ') : 'Non spécifié';
    };

    // Create detailed email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0033cc, #004080); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Nouvelle Commande de Logo</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Commande #${order.id.substring(0, 8)}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0033cc; margin-top: 0;">📋 Informations sur l'entreprise</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 200px;">Nom de l'entreprise:</td>
              <td style="padding: 8px 0;">${order.company_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Secteur d'activité:</td>
              <td style="padding: 8px 0;">${order.sector}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${order.email}" style="color: #0033cc;">${order.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Téléphone:</td>
              <td style="padding: 8px 0;"><a href="tel:${order.phone}" style="color: #0033cc;">${order.phone}</a></td>
            </tr>
            ${order.website ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Site web:</td>
              <td style="padding: 8px 0;"><a href="${order.website}" target="_blank" style="color: #0033cc;">${order.website}</a></td>
            </tr>` : ''}
          </table>

          <h2 style="color: #0033cc;">🎨 Informations sur le logo</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 200px;">Nom du logo:</td>
              <td style="padding: 8px 0;">${order.logo_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Style souhaité:</td>
              <td style="padding: 8px 0;">${order.style}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Formats souhaités:</td>
              <td style="padding: 8px 0;">${formatArray(order.formats)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message à véhiculer:</td>
              <td style="padding: 8px 0;">${order.message}</td>
            </tr>
          </table>

          <h2 style="color: #0033cc;">🎯 Préférences visuelles</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            ${order.preferred_colors ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 200px;">Couleurs préférées:</td>
              <td style="padding: 8px 0;">${order.preferred_colors}</td>
            </tr>` : ''}
            ${order.avoided_colors ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Couleurs à éviter:</td>
              <td style="padding: 8px 0;">${order.avoided_colors}</td>
            </tr>` : ''}
            ${order.typography ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Typographie:</td>
              <td style="padding: 8px 0;">${order.typography}</td>
            </tr>` : ''}
            ${order.icons ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Éléments graphiques:</td>
              <td style="padding: 8px 0;">${order.icons}</td>
            </tr>` : ''}
            ${order.slogan ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Slogan:</td>
              <td style="padding: 8px 0;">${order.slogan}</td>
            </tr>` : ''}
            ${order.examples_url ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Exemples appréciés:</td>
              <td style="padding: 8px 0;"><a href="${order.examples_url}" target="_blank" style="color: #0033cc;">${order.examples_url}</a></td>
            </tr>` : ''}
            ${order.usage && order.usage.length > 0 ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Utilisations prévues:</td>
              <td style="padding: 8px 0;">${formatArray(order.usage)}</td>
            </tr>` : ''}
          </table>

          <h2 style="color: #0033cc;">💰 Informations de commande</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0033cc;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 200px;">Forfait sélectionné:</td>
                <td style="padding: 8px 0;">${order.package === 'basic' ? 'Basique' : order.package === 'advanced' ? 'Avancé' : 'Ultime'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Montant:</td>
                <td style="padding: 8px 0; font-size: 18px; color: #0033cc; font-weight: bold;">${formatPrice(order.amount)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Date de commande:</td>
                <td style="padding: 8px 0;">${new Date(order.created_at).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Statut:</td>
                <td style="padding: 8px 0;">
                  <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: bold;">
                    En attente de paiement
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #1565c0; font-weight: bold;">📧 Action requise</p>
            <p style="margin: 10px 0 0 0; color: #1976d2;">
              Le client attend la confirmation du paiement. Vérifiez le tableau de bord Stripe pour confirmer la transaction.
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to business
    const emailResponse = await resend.emails.send({
      from: "Bluw <onboarding@resend.dev>",
      to: ["streulens.salif@gmail.com"],
      subject: `🎨 Nouvelle commande de logo - ${order.company_name} (${formatPrice(order.amount)})`,
      html: emailHtml,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-logo-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);