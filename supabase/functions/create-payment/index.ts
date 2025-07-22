

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  name: string;
  email: string;
  package: string;
  message: string;
}

const getPackageAmount = (packageType: string): number => {
  switch (packageType) {
    case 'basic':
      return 28000; // 280€ in cents
    case 'advanced':
      return 69000; // 690€ in cents
    case 'ultimate':
      return 129000; // 1290€ in cents
    default:
      return 28000;
  }
};

const getPackageName = (packageType: string): string => {
  switch (packageType) {
    case 'basic':
      return 'Forfait Basic - Création de logo';
    case 'advanced':
      return 'Forfait Advanced - Logo + Identité visuelle';
    case 'ultimate':
      return 'Forfait Ultimate - Pack complet';
    default:
      return 'Forfait Basic';
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, package: packageType, message }: PaymentRequest = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        name,
        email,
        package: packageType,
        message,
        amount: getPackageAmount(packageType),
        currency: "eur",
        status: "pending"
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order");
    }

    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: getPackageName(packageType),
              description: `Commande pour ${name} - ${message.substring(0, 100)}...`
            },
            unit_amount: getPackageAmount(packageType),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/contact?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/contact?cancelled=true`,
      metadata: {
        order_id: order.id,
        package: packageType,
      },
    });

    // Update order with Stripe session ID
    await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    console.log("Payment session created successfully:", session.id);

    return new Response(JSON.stringify({ url: session.url, order_id: order.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

