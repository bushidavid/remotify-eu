import bcrypt, { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import supabase from '../../../../lib/config/supabaseClient';
import { sendgridClient } from '../../../../lib/email';
import { BeehiivClient } from "@beehiiv/sdk";


export async function POST(req){

    const body = await req.json();

    let {name, surname, email, password, userType, newsletter} = body.data;

    if(!email || !password) {
        return new NextResponse({message: "Missing email or password"}, {status: 400});
    }

    if(newsletter){

        const client = new BeehiivClient({ token: process.env.BEEHIIV_API_KEY });
    
        const subscription = await client.subscriptions.create("pub_13473294-d75b-4c1d-82f8-b57f928be263", {
            email: email,
            reactivateExisting: false,
            sendWelcomeEmail: true,
            utmSource: "RemotifyEurope",
            utmMedium: "organic",
            utmCampaign: "Newsletter PopUp",
            referringSite: "www.remotifyeurope.com",
        });

        console.log("subscription to beehiiv created: ", subscription);

        const url = `https://api.sendgrid.com/v3/marketing/contacts`;
  
        const data = {
            contacts: [{ email: email }],
            list_ids: [process.env.SENDGRID_MAILING_ID],
        };

        const headers = {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
        };
    
        const options = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data),
        };

        const message = {
            from: {
                email: 'info@remotifyeurope.com',
                name: 'RemotifyEurope Newsletter'
            },
            asm: {
                group_id: 24526,
                groups_to_display: [
                    24526
                ],
            },
            personalizations: [
                {
                to: [
                    {
                    email: email,
                    },
                ],
                },
            ],
            "template_id":"d-ddbedfaf8be14c1997b0ca6bc915c61b", 
        }

        // add contact to contact list
        try {
            const response = await fetch(url, options);
            const json = await response.json();

            console.log("Successfully added email to contact list: ", json);

        } catch (error) {
            console.log("Could not add email to contact list");
        }

        // send email to new registered person
        try {
            await sendgridClient
                .send(message)
                .then(() => console.log('Mail sent successfully'))
                .catch(error => {
                    console.error(error);
                });
            }catch(error){
                console.log("couldn't send email because: ", error);
            }
        }

    try {
        const {data: user, error} = await supabase
        .from('users')
        .select()
        .eq('email', email)


        if (user && user.length > 0) {
            console.log("Existing user found");
            return NextResponse.json({ message: "User already exists", status: 409, ok: false });
        }

        if(error){
            console.log("error while looking for the user", error);
            return NextResponse.json({message: error, status: error.status, ok: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const {error: newUserError} = await supabase
        .from('users')
        .insert({
            name: name,
            last_name: surname,
            email: email,
            password: hashedPassword,
            role: userType
        })

        if(newUserError) {
            console.log("error creating user", newUserError);
            return NextResponse.json({message: newUserError, status: newUserError.status, ok: false});
        }else{
            console.log("user created succesfully");
            return NextResponse.json({message: "User successfully created", status: 200, ok: true});
        }
        
    } catch (err) {
        console.log(err);
        return new NextResponse({message: err, status: err.status})
    }

   
}