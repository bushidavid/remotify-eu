import Stripe from "stripe";
import { NextResponse } from "next/server";

const revalidate = 0; 

export async function GET() {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({
        limit: 3,
        active: true,
    });

    console.log("getting prices", prices);

    return NextResponse.json(prices.data.reverse());
}
