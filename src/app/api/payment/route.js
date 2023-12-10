import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (NextRequest) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const data  = await NextRequest.json();

    console.log(data);

    const priceId = data.priceId[0];
    const newJobId = data.newJobId;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: process.env.NEXT_PUBLIC_BASE_URL,
        cancel_url: process.env.NEXT_PUBLIC_BASE_URL,
        metadata: {
            newJobId,
        },
        payment_intent_data: {
            metadata: {
                newJobId
            }
        },
    })

    return NextResponse.json({"url": session.url});

}