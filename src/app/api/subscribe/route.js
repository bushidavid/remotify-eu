import { NextResponse } from "next/server";
import { BeehiivClient } from "@beehiiv/sdk";
import { sendgridClient } from "../../../../lib/email";

export async function PUT( req ) {

    const body = await req.json();

    const email = body.email;

    const url = `https://api.sendgrid.com/v3/marketing/contacts`;

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
          email: 'sales@remotifyeurope.com',
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

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        sendgridClient
        .send(message)
        .then(() => console.log('Mail sent successfully'))
        .catch(error => {
          console.error(error);
        });

        return NextResponse.json({message: "Your email has been succesfully added to the mailing list. Welcome 👋" , status: 200, ok: true, jobId: json.job_id})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Oups, there was a problem with your subscription, please try again or contact us", status: 500, ok: false})
    }
  }

  