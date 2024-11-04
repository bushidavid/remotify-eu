import Stripe from "stripe";
import { NextResponse } from "next/server";

const revalidate = 0; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {

    const obj = await stripe.prices.list({
        limit: 6,
        active: true,
    });

    const prices = obj.data.filter(price => price.recurring);
    console.log("printing subscriptions: ", prices);

    return NextResponse.json({ prices: prices.reverse() });
}
