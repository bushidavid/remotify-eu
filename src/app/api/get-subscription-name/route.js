import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST (req) {

    const { subscriptionId } = await req.json();

    console.log("printing subscriptionID:", subscriptionId)

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId);
    const product = await stripe.products.retrieve(price.product);

    console.log("Subscription Plan Name:", product.name);

    if(product.name){
        console.log("Found the name of the subscription", product.name);
        return NextResponse.json({
            ok: true,
            name: product.name,
            status: 200,
            message: "Subscriptions retrieved successfully",
        });
    }else{
        console.error("Error fetching subscription name");
        return NextResponse.json({
            status: 'error',
            message: "Failed to retrieve subscription name",
        });
    }
}

