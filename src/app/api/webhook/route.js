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

            console.log("printing customer id after payment", event.data.object.customer)
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

          console.log("inside checkout session completed");

            try {
                const {data, error} = await supabase
                            .from("job")
                            .update({ payment_verified: "TRUE" })
                            .eq('id', newJobId)

                console.log("printing customer id after payment", event.data.object.customer);

                const {data: companyId, error: getIdError} = await supabase
                    .from("users")
                    .select("id")
                    .eq("stripe_customer_id", event.data.object.customer)


                console.log("inserting order data in DB");

                const {error: insertOrderError} = await supabase
                    .from("order")
                    .insert(
                        {
                            company_id: companyId[0].id,
                            amount: event.data.object.amount_total,
                            stripe_price_id: event.data.object.metadata.price, 
                            status: 1
                        }
                    )
    
                if(error || getIdError || insertOrderError){
                    console.log(error, getIdError, insertOrderError);
                    return NextResponse.json({ message: error?.message || getIdError?.message || insertOrderError?.message }, { status: 400 });
                }
              } catch (err) {
                    console.log(err);
                    return NextResponse.json({ message: err }, { status: 400 });
              }
            break;
        case 'payment_intent.created':
            try {
                console.log("printing customer id ", event.data.object.customer)

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
        case 'charge.failed':

        console.log("inside charge failed");

            try {
                console.log("printing customer id", event.data.object.customer)

                const {data: companyId, error: getIdError} = await supabase
                    .from("users")
                    .select("id")
                    .eq("email", event.data.object.customer_email)

                console.log(companyId[0]);

                console.log("inserting order data in DB");

                const {error: insertOrderError} = await supabase
                    .from("order")
                    .insert(
                        {
                            company_id: companyId[0].id,
                            amount: event.data.object.amount_total,
                            stripe_price_id: event.data.object.metadata.price, 
                            status: 2
                        }
                    )
    
                if(error || getIdError || insertOrderError){
                    console.log(error, getIdError, insertOrderError);
                    return NextResponse.json({ message: error?.message || getIdError?.message || insertOrderError?.message }, { status: 400 });
                }
            } catch (err) {
                    console.log(err);
                    return NextResponse.json({ message: err }, { status: 400 });
            }
            break;
        case 'payment_intent.payment_failed':

            console.log("inside payment intent failed");

                try {
                    console.log("printing customer id", event.data.object.customer)

                    const {data: companyId, error: getIdError} = await supabase
                        .from("users")
                        .select("id")
                        .eq("email", event.data.object.receipt_email)

                    console.log(companyId[0]);

                    console.log("inserting order data in DB");

                    const {error: insertOrderError} = await supabase
                        .from("order")
                        .insert(
                            {
                                company_id: companyId[0].id,
                                amount: event.data.object.amount,
                                stripe_price_id: event.data.object.metadata.price, 
                                status: 2
                            }
                        )

                    if(getIdError || insertOrderError){
                        console.log(getIdError, insertOrderError);
                        return NextResponse.json({ message: getIdError?.message || insertOrderError?.message }, { status: 400 });
                    }
                } catch (err) {
                        console.log(err);
                        return NextResponse.json({ message: err }, { status: 400 });
                }
            break;
        case 'checkout.session.expired':

            console.log("inside payment intent failed");

                try {
                    console.log("printing customer id", event.data.object.customer)

                    const {data: companyId, error: getIdError} = await supabase
                        .from("users")
                        .select("id")
                        .eq("email", event.data.object.customer_email)

                    console.log(companyId[0]);

                    console.log("inserting order data in DB");

                    const {error: insertOrderError} = await supabase
                        .from("order")
                        .insert(
                            {
                                company_id: companyId[0].id,
                                amount: event.data.object.amount_total,
                                stripe_price_id: event.data.object.metadata.price, 
                                status: 2
                            }
                        )

                    if(getIdError || insertOrderError){
                        console.log(getIdError, insertOrderError);
                        return NextResponse.json({ message: getIdError?.message || insertOrderError?.message }, { status: 400 });
                    }
                } catch (err) {
                        console.log(err);
                        return NextResponse.json({ message: err }, { status: 400 });
                }
            break;

            case 'customer.created':

            console.log("inside customer created");

                try {
                    console.log("printing customer id", event.data.object.id)

                    const {data: internalCustomerId, error: getIdError} = await supabase
                        .from("users")
                        .select("id")
                        .eq("email", event.data.object.email)

                    console.log(internalCustomerId[0]);

                    console.log("inserting customer stripe ID in DB");

                    const {error: insertCustomerStripeIdError} = await supabase
                        .from("users")
                        .update(
                            {
                                stripe_customer_id: event.data.object.id
                            }
                        )
                        .eq('email', internalCustomerId[0]);

                    if(getIdError || insertCustomerStripeIdError){
                        console.log(getIdError, insertCustomerStripeIdError);
                        return NextResponse.json({ message: getIdError?.message || insertCustomerStripeIdError?.message }, { status: 400 });
                    }
                } catch (err) {
                        console.log(err);
                        return NextResponse.json({ message: err }, { status: 400 });
                }
            break;
            
        default:
          console.log(`Unhandled event type: `, event.type);
    }

    return NextResponse.json({ message: 'finished' }, { status: 200 });
}

