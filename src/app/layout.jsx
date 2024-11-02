import './globals.css'
import Providers from './providers';
import {ContextProvider} from './context/store';
import Navbar from './components/navbar';
import SessProvider from './components/session-provider';
import SubscribeModal from './components/subscribe-modal';
import { GoogleAnalytics } from '@next/third-parties/google';




export const metadata = {
  title: 'RemotifyEurope: The Best Remote Jobs in Europe',
  description: 'The best remote job board in Europe',
  openGraph: {
    title: 'RemotifyEurope: The Best Remote Jobs in Europe',
    description: 'Find the best remote jobs in Europe',
    images: [
      '/Logo.jpg' // Path to the Open Graph image in your public directory
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen min-w-screen items-center no-scrollbar min-h-screen font-poppins'>
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