import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import supabase from "../../../../lib/config/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST (req) {

    const sig = req.headers.get('stripe-signature');
      
    let event;

    try {
        event = stripe.webhooks.constructEvent(await req.text(), sig, process.env.STRIPE_WEBHOOK_SECRET_KEY);
        console.log("printint the event: ", event);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "hello" }, { status: 400 });
    }

    const newJobId = event.data.object.metadata["newJobId"];

    console.log(event.type);

    switch (event.type) {
        case 'payment_intent.succeeded':
          try {
            const {data, error} = await supabase
                        .from("job")
                        .update({ payment_verified: "TRUE" })
                        .eq('id', newJobId)

            if(error){
                return NextResponse.json({ message: error.message }, { status: 400 });
            }
          } catch (err) {
                console.log(err);
                return NextResponse.json({ message: err }, { status: 400 });
          }
          
          break;
        case 'checkout.session.completed':
            try {
                const {data, error} = await supabase
                            .from("job")
                            .update({ payment_verified: "TRUE" })
                            .eq('id', newJobId)
    
                if(error){
                    return NextResponse.json({ message: error.message }, { status: 400 });
                }
              } catch (err) {
                    console.log(err);
                    return NextResponse.json({ message: err }, { status: 400 });
              }
            break;
        case 'payment_intent.created':
            try {
                const {data, error} = await supabase
                            .from("job")
                            .update({ payment_verified: "TRUE" })
                            .eq('id', newJobId)
    
                if(error){
                    return NextResponse.json({ message: error.message }, { status: 400 });
                }
                } catch (err) {
                    console.log(err);
                    return NextResponse.json({ message: err }, { status: 400 });
                }
            break;
        default:
          console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ message: 'finished' }, { status: 200 });

}

