import { NextResponse } from "next/server";

export async function PUT( req ) {

    const body = await req.json();

    const email = body.email;

    console.log(email);
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

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        return NextResponse.json({message: "Your email has been succesfully added to the mailing list. Welcome 👋" , status: 200, ok: true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Oups, there was a problem with your subscription, please try again or contact us", status: 500, ok: false})
    }
  }

  