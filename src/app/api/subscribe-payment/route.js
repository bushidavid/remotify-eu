import Stripe from "stripe";
import { NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function getOrCreateCustomer(email) {
    // Step 1: Check if the user already has a Stripe customer ID in the database
    const { data: user, error } = await supabase
        .from('users')
        .select('stripe_customer_id')
        .eq('email', email)
        .single();

    if (error) {
        throw new Error("Error fetching user data: " + error.message);
    }

    let stripeCustomerId = user?.stripe_customer_id;

    // Step 2: If no customer ID exists, create a new customer in Stripe
    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: email,
        });

        stripeCustomerId = customer.id;

        // Step 3: Save the new Stripe customer ID to the database
        const { error: updateError } = await supabase
            .from('users')
            .update({ stripe_customer_id: stripeCustomerId })
            .eq('email', email);

        if (updateError) {
            throw new Error("Error saving Stripe customer ID to database: " + updateError.message);
        }
    }

    return stripeCustomerId;
}

export async function POST(req) {
    const data = await req.json();
    const priceId = data.priceId[0];
    const email = data.email;

    console.log(priceId);

    try {
        // Step 1: Retrieve or create the customer ID
        const stripeCustomerId = await getOrCreateCustomer(email);

        // Step 2: Create the checkout session using the retrieved or created customer ID
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId, // Use existing customer if available
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/candidate/dashboard/bookmarks`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-premium`,
        });

        return NextResponse.json({ "url": session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        return NextResponse.json({
            status: 'error',
            message: error.message || "Failed to create checkout session",
        });
    }
}
