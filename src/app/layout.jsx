import './globals.css'
import Providers from './providers';
import {ContextProvider} from './context/store';
import Navbar from './components/navbar';
import SessProvider from './components/session-provider';
import SubscribeModal from './components/subscribe-modal';
import { GoogleAnalytics } from '@next/third-parties/google';




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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen items-center no-scrollbar font-poppins'>
        <SessProvider >
          <Navbar />
            <Providers>
              <ContextProvider >
              <SubscribeModal />
                { children }
                
              </ContextProvider>
            </Providers>
            
          </SessProvider>
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  )
}