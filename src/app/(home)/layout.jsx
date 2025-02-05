import '../globals.css'
import {ContextProvider} from '../context/store';
import Navbar from '../components/navbar';
import SubscribeModal from '../components/subscribe-modal';
import { GoogleAnalytics } from '@next/third-parties/google';
import { createClient } from '../../../lib/utils/supabase/server';



export const metadata = {
  title: 'RemotifyEurope - The Best Remote and Work From Home Jobs in Europe and in European time zones',
  description: 'Find the best remote jobs in Europe and in European time zones',
  openGraph: {
    title: 'RemotifyEurope - The Best Remote and Work from Home Jobs in Europe and in European time zones',
    description: 'Find the best remote jobs in Europe and in European Time Zones',
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/logo_opengraph.png` // Path to the Open Graph image in your public directory
    ],
  },
  twitter: {
    title: `RemotifyEurope - The Best Remote Jobs in Europe and in European time zones`,
    description: 'Find the best remote jobs in Europe and in European time zones at RemotifyEurope',
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/logo_opengraph.png`,  // Set Twitter image URL
  }
}

export default async function RootLayout({ children }) {


    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser()

    return (
      <html lang="en">
        <body className='flex flex-col w-screen items-center no-scrollbar font-poppins'>
            <Navbar user={user} />

                <ContextProvider >
                <SubscribeModal />
                  { children }
                  
                </ContextProvider>

          </body>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      </html>
  )
}