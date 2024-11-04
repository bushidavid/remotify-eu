import { NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST (req) {

    const { newPriceId, customerId } = await req.json();

    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1,
    });
    
    const subscription = subscriptions.data[0];
    const subscriptionItemId = subscription.items.data[0].id;

    const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
        items: [{
          id: subscriptionItemId,
          price: newPriceId, // The ID of the new price (plan) the user selects
        }],
        proration_behavior: 'create_prorations', // Adjusts billing for the change
    });
    
    if(subscription.status == 'canceled'){

        return NextResponse.json({
            ok: true,
            status: 200,
            message: "Subscriptions canceled successfully",
        });

    }else{
        return NextResponse.json({
            ok: false,
            status: 404,
            message: "Couldn't cancel subscription",
        });
    }
}

