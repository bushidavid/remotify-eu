import { sendgridClient } from '../../../../lib/email';
import getJobsByCategory from '../../../../lib/utils/getJobsForNewsletter';
import React from 'react';
import { render } from '@react-email/render';
import WeeklyNewsletter from '../../../../emails/weeklyNewsletter.jsx';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        //Fetch hottest jobs grouped by category
        const categories = await getJobsByCategory();

        // // Prepare email content using react-email
        const emailContent = await render(<WeeklyNewsletter categories={categories} />);

        //console.log("printing jobs: ", jobs)

        //Send email via SendGrid
        const message = {
            from: {
              email: 'david.bushi@remotifyeurope.com',
              name: 'David from RemotifyEurope'
            },
            asm: {
              group_id: 24526,
              groups_to_display: [24526],
            },
            personalizations: [
              {
                to: [
                  { email: 'bushidavid@gmail.com' } // This can be left empty if you're using a list ID
                ],
                list_id: 'e6deb28a-093d-4de6-9bfe-53119cf21cee' // Add your list ID here
              },
            ],
            subject: "This Week's Remote Jobs in Europe",
            html: emailContent
          };
          
    
        try {
    
            await sendgridClient.send(message)  
            console.log("Weekly newsletter sent succesfully");  
            return NextResponse.json({message: "Your email has been succesfully sent" , status: 200, ok: true})

        } catch (error) {

            console.log(error);
            return NextResponse.json({message: error.response, status: error.code, ok: false})

        }
        
        
    } catch (error) {
        console.error("Failed to send newsletter", error);
        return NextResponse.json({message: "Oups, there was a problem sending your email", status: 500, ok: false})
    }
}
