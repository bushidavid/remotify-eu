import { MailService } from "@sendgrid/mail";

export const sendgridClient = new MailService();

sendgridClient.setApiKey(process.env.SENDGRID_API_KEY || "");


const msg = {
  to: 'bushidavid@gmail.com', // Change to your recipient
  from: 'david.ushi@remotifyeurope.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}


