
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationRequest {
  order_id: string;
  session_id?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id, session_id }: ConfirmationRequest = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      throw new Error("Order not found");
    }

    // Update order status if session_id is provided (payment successful)
    if (session_id) {
      await supabase
        .from("orders")
        .update({ 
          status: "paid",
          stripe_session_id: session_id 
        })
        .eq("id", order_id);
    }

    const getPackageDetails = (packageType: string) => {
      switch (packageType) {
        case 'basic':
          return { name: 'Forfait Basic', price: '299€', features: ['3 propositions de logo', 'Fichiers PNG et JPG', 'Révisions incluses'] };
        case 'advanced':
          return { name: 'Forfait Advanced', price: '499€', features: ['5 propositions de logo', 'Carte de visite', 'Papier en-tête', 'Tous formats de fichiers'] };
        case 'ultimate':
          return { name: 'Forfait Ultimate', price: '799€', features: ['Logo complet', 'Identité visuelle', 'Guide de style', 'Supports marketing', 'Formats vectoriels'] };
        default:
          return { name: 'Forfait Basic', price: '299€', features: [] };
      }
    };

    const packageDetails = getPackageDetails(order.package);
    const isPaymentConfirmation = session_id ? true : false;

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "BLUW Design <noreply@bluwdesign.fr>",
      to: [order.email],
      subject: isPaymentConfirmation 
        ? "🎉 Paiement confirmé - Votre commande BLUW Design" 
        : "📝 Commande reçue - BLUW Design",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .feature-list { list-style: none; padding: 0; }
            .feature-list li { padding: 8px 0; padding-left: 20px; position: relative; }
            .feature-list li:before { content: "✓"; color: #667eea; font-weight: bold; position: absolute; left: 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
            .status-paid { background: #d4edda; color: #155724; }
            .status-pending { background: #fff3cd; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>BLUW Design</h1>
              <h2>${isPaymentConfirmation ? '🎉 Paiement confirmé !' : '📝 Commande reçue'}</h2>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${order.name}</strong>,</p>
              
              ${isPaymentConfirmation 
                ? '<p>Merci beaucoup ! Votre paiement a été confirmé et nous allons maintenant commencer à travailler sur votre projet.</p>'
                : '<p>Nous avons bien reçu votre demande et nous vous remercions de votre confiance.</p>'
              }
              
              <div class="order-details">
                <h3>Détails de votre commande</h3>
                <p><strong>Package :</strong> ${packageDetails.name}</p>
                <p><strong>Prix :</strong> ${packageDetails.price}</p>
                <p><strong>Status :</strong> 
                  <span class="status-badge ${isPaymentConfirmation ? 'status-paid' : 'status-pending'}">
                    ${isPaymentConfirmation ? 'Payé' : 'En attente de paiement'}
                  </span>
                </p>
                
                <h4>Inclus dans votre forfait :</h4>
                <ul class="feature-list">
                  ${packageDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <p><strong>Votre message :</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 4px; font-style: italic;">"${order.message}"</p>
              </div>
              
              ${isPaymentConfirmation 
                ? `
                  <h3>Prochaines étapes</h3>
                  <p>Nous allons vous contacter dans les <strong>24h</strong> pour :</p>
                  <ul>
                    <li>Discuter de vos préférences en détail</li>
                    <li>Planifier le calendrier de livraison</li>
                    <li>Commencer le processus créatif</li>
                  </ul>
                `
                : `
                  <h3>Pour finaliser votre commande</h3>
                  <p>Pour que nous puissions commencer à travailler sur votre projet, veuillez finaliser le paiement via le lien que vous avez reçu.</p>
                `
              }
              
              <div class="footer">
                <p>Une question ? Répondez simplement à cet email ou contactez-nous.</p>
                <p><strong>BLUW Design</strong><br>
                Votre partenaire créatif pour une identité visuelle unique</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      email_sent: true,
      order_status: isPaymentConfirmation ? 'paid' : 'pending'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-confirmation:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
