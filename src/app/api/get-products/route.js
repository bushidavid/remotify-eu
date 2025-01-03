import Stripe from "stripe";
import { NextResponse } from "next/server";

const revalidate = 0; 

export async function GET() {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let obj;

    try {
        obj = await stripe.prices.list({
            limit: 6,
            active: true,
        });
    } catch (error) {
        console.log("Error fetching prices from stripe: ", error);
    }
    

    // Merge prices and subscription into one object
    const prices = obj.data.filter(price => !price.recurring)

    return NextResponse.json({prices: prices});
}
