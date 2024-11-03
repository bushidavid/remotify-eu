import Stripe from "stripe";
import { NextResponse } from "next/server";

const revalidate = 0; 

export async function GET() {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const obj = await stripe.products.list ({
        limit: 10,
    });

    const products = obj.data.filter(product => product.name == "Basic" || product.name == "Professional" || product.name == "Pro but Better" )

    return NextResponse.json(products);
}
