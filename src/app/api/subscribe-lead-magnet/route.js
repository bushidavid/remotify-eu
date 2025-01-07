import { NextResponse } from "next/server";
import { BeehiivClient } from "@beehiiv/sdk";

import { sendgridClient } from "../../../../lib/email";

export async function PUT( req ) {

    const body = await req.json();

    const { email, name, lastName } = body;

    console.log("email :", email);
    console.log("name :", name);
    console.log("lastName :", lastName);

    const client = new BeehiivClient({ token: process.env.BEEHIIV_API_KEY });

    const subscription = await client.subscriptions.create("pub_13473294-d75b-4c1d-82f8-b57f928be263", {
        email: email,
        reactivateExisting: false,
        sendWelcomeEmail: true,
        utmSource: "RemotifyEurope",
        utmMedium: "organic",
        utmCampaign: "170+ companies hiring remote",
        referringSite: "www.remotifyeurope.com",
        customFields: [{
                name: "First Name",
                value: name
            }, {
                name: "Last Name",
                value: lastName
            }],
    });

    console.log("subscription to beehiiv created: ", subscription);


    const url = `https://api.sendgrid.com/v3/marketing/contacts`;
  
    const data = {
      contacts: [{ email: email, first_name: name, last_name: lastName }],
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
        name: 'David at RemotifyEurope'
      },
      asm: {
        group_id: 24526,
        groups_to_display: [
            24526
        ],
      },
      personalizations: [
        {
            "to": [
                {
                    "email": String(email),
                },
            ],
        },
      ],
        "template_id":"d-eac8b29347314834bb934679a1aad682",
        "dynamic_template_data": {
            "name": String(name),
            "file_link": "https://docs.google.com/spreadsheets/d/1KgePlqGmNdOVW32Yu3MT5IlVHTjLZLCBWXT7GfxDNF8/edit?gid=0#gid=0",
        },
    }

    const response = await fetch(url, options);
    let json = {};

    if (response.ok) {
        const text = await response.text();  // Get response as text
        json = text ? JSON.parse(text) : {};  // Parse if not empty
    } else {
        throw new Error(`Failed to add contact. Status: ${response.status}`);
    }

    try {
        
        await sendgridClient.send(message);
        console.log("Mail sent successfully");
        

        return NextResponse.json({
                message: "Your email has been successfully added to the mailing list. Welcome 👋",
                status: 200,
                ok: true,
                jobId: json.job_id || null  // Handle undefined job_id
            });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: `Problem sending email to: ${email}`, status: 500, ok: false})
    }
    
  }

  