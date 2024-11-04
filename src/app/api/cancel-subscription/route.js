import { NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST (req) {

    const { id } = await req.json();

    const subscription = await stripe.subscriptions.cancel(
        id
    );

    
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

