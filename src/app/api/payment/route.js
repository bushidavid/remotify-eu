import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (NextRequest) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const data  = await NextRequest.json();

    const priceId = data.priceId[0];
    const newJobId = data.newJobId;
    const email = data.user.email;
    const customerId = data.user.id;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                currency: 'eur',
                price: priceId,
                quantity: 1,
            }
        ],
        mode: "payment",
        billing_address_collection: "required",
        success_url: process.env.NEXT_PUBLIC_BASE_URL,
        cancel_url: process.env.NEXT_PUBLIC_BASE_URL,
        customer_email: email,
        metadata: {
            newJobId,
        },
        payment_intent_data: {
            metadata: {
                newJobId,
                price: priceId
            }
        },
    })

    return NextResponse.json({"url": session.url});

}