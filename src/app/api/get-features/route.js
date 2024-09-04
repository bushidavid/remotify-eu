import Stripe from "stripe";
import { NextResponse } from "next/server";

const revalidate = 0; 

export async function GET() {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || process.env.STRIPE_LIVE_KEY);

    const products = await stripe.products.list ({
        limit: 4,
    });

    return NextResponse.json(products.data.reverse());
}
