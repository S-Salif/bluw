import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LogoOrderRequest {
  // Company information
  companyName: string;
  sector: string;
  email: string;
  phone: string;
  website?: string;
  
  // Logo information
  logoName: string;
  style: string;
  message: string;
  formats: string[];
  
  // Visual preferences (optional)
  preferredColors?: string;
  avoidedColors?: string;
  typography?: string;
  icons?: string;
  slogan?: string;
  examplesUrl?: string;
  usage?: string[];
  
  // Package
  package: string;
}

const getPackageAmount = (packageType: string): number => {
  switch (packageType) {
    case "basic":
      return 28000; // 280€ in cents
    case "advanced":
      return 69000; // 690€ in cents
    case "ultimate":
      return 129000; // 1290€ in cents
    default:
      throw new Error(`Unknown package type: ${packageType}`);
  }
};

const getPackageName = (packageType: string): string => {
  switch (packageType) {
    case "basic":
      return "Forfait Basique";
    case "advanced":
      return "Forfait Avancé";
    case "ultimate":
      return "Forfait Ultime";
    default:
      return "Forfait";
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: LogoOrderRequest = await req.json();
    console.log("Processing logo order:", orderData);

    // Initialize Supabase service client (for database operations)
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const amount = getPackageAmount(orderData.package);
    const packageName = getPackageName(orderData.package);

    // Create order in database
    const { data: order, error: dbError } = await supabaseService
      .from("logo_orders")
      .insert({
        company_name: orderData.companyName,
        sector: orderData.sector,
        email: orderData.email,
        phone: orderData.phone,
        website: orderData.website,
        logo_name: orderData.logoName,
        style: orderData.style,
        message: orderData.message,
        formats: orderData.formats,
        preferred_colors: orderData.preferredColors,
        avoided_colors: orderData.avoidedColors,
        typography: orderData.typography,
        icons: orderData.icons,
        slogan: orderData.slogan,
        examples_url: orderData.examplesUrl,
        usage: orderData.usage || [],
        package: orderData.package,
        amount: amount,
        currency: "eur",
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Order created in database:", order.id);

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: orderData.email,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Existing customer found:", customerId);
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: orderData.email,
        name: orderData.companyName,
        phone: orderData.phone,
      });
      customerId = customer.id;
      console.log("New customer created:", customerId);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Logo Design - ${packageName}`,
              description: `Création de logo pour ${orderData.companyName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/contact?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/contact?cancelled=true`,
      metadata: {
        order_id: order.id,
        order_type: "logo_design",
      },
    });

    console.log("Stripe session created:", session.id);

    // Update order with session ID
    const { error: updateError } = await supabaseService
      .from("logo_orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    if (updateError) {
      console.error("Error updating order with session ID:", updateError);
    }

    // Send notification email to business
    try {
      await supabaseService.functions.invoke('send-logo-notification', {
        body: {
          order_id: order.id,
          order_data: orderData,
        },
      });
    } catch (emailError) {
      console.error("Error sending notification email:", emailError);
      // Don't fail the order creation if email fails
    }

    return new Response(
      JSON.stringify({
        url: session.url,
        order_id: order.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in create-logo-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});