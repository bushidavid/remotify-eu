import './globals.css'
import { Roboto, Inter, Ubuntu_Mono, Montserrat } from 'next/font/google';
import Footer from './components/footer'
import {ContextProvider} from './context/store';
import Navbar from './components/navbar';
import { GoogleAnalytics } from '@next/third-parties/google'


export const metadata = {
  title: 'RemotifyEurope',
  description: 'The best remote job board in Europe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen items-center no-scrollbar h-screen font-poppins'>

            <Navbar />
              <ContextProvider >
                { children }
              </ContextProvider>
              <Footer />
          
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  )
}