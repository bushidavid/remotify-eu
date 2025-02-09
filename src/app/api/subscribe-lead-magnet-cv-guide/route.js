import { NextResponse } from "next/server";
import { BeehiivClient } from "@beehiiv/sdk";
import { sendgridClient } from "../../../../lib/email";

export async function PUT( req ) {

    const body = await req.json();

    const { email, name, lastName } = body;

    console.log("email :", email);
    console.log("name :", name);
    console.log("lastName :", lastName);

    const url = `https://api.sendgrid.com/v3/marketing/contacts`;

    const client = new BeehiivClient({ token: process.env.BEEHIIV_API_KEY });

    const subscription = await client.subscriptions.create("pub_13473294-d75b-4c1d-82f8-b57f928be263", {
        email: email,
        reactivateExisting: false,
        sendWelcomeEmail: true,
        utmSource: "RemotifyEurope",
        utmMedium: "organic",
        utmCampaign: "CV Guide",
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
        "template_id":"d-9836097f71cd4d6eb0565ae23086bdd6",
        "dynamic_template_data": {
            "name": String(name),
            "file_link": "https://rzghwrcqyzeuluqxwale.supabase.co/storage/v1/object/sign/RemotifyLogoLeadMagnets/PDFs/Remote_CV_Guide.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJSZW1vdGlmeUxvZ29MZWFkTWFnbmV0cy9QREZzL1JlbW90ZV9DVl9HdWlkZS5wZGYiLCJpYXQiOjE3MzU4MjgxMjYsImV4cCI6MTc2NzM2NDEyNn0.qahr_yoYVxRMmgIMNdxUR1Z45HAR5pPcG4z1kj6hrZE&t=2025-01-02T14%3A28%3A47.370Z",
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

  