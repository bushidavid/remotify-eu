import { NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST (req) {

    const { internalCustomerId }  = await req.json();


    // Fetch stripe_customer_id from Supabase
    const { data, error } = await supabase
        .from('users')
        .select('stripe_customer_id')
        .eq('id', internalCustomerId)
        .single();


    if (error || !data) {
        return NextResponse.json({ status: 'error', message: 'Customer not found' });
    }


    const stripeCustomerId = data.stripe_customer_id;

    try {
        // Fetch subscriptions from Stripe
        const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomerId, // Retrieved from your database
            limit: 3,
        });

        console.log("printing subscriptions data", subscriptions.data);

        return NextResponse.json({
            subscriptions: subscriptions,
            status: 200,
            message: "Subscriptions retrieved successfully",
        });
    } catch (err) {
        console.error("Error fetching subscriptions:", err);
        return NextResponse.json({
            status: 'error',
            message: "Failed to retrieve subscriptions",
        });
    }
}

