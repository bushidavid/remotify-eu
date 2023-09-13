import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (NextRequest) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const data  = await NextRequest.json();

    let priceId = data.priceId;

    console.log("logging the priceId: \n")
    console.log(priceId);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
    })

    return NextResponse.json({"url": session.url});

}