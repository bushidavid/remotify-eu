import './globals.css'
import { Roboto, Inter, Ubuntu_Mono, Montserrat } from 'next/font/google';
import Footer from './components/footer'
import Providers from './providers';
import NavbarComp from './components/navbar';
import {ContextProvider} from './context/store';
import Navbar from './components/navbar';
import SessProvider from './components/session-provider';
import SubscribeModal from './components/subscribe-modal';
import Script from 'next/script';


export const metadata = {
  title: 'RemotifyEurope',
  description: 'The best remote job board in Europe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q1N3W29DPP"></Script>
        <Script id='google-analytics'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${'${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}'});
          `}
        </Script>
      </head>
      <body className='flex flex-col w-screen min-w-screen items-center no-scrollbar min-h-screen font-poppins'>
        <SessProvider >
          <Navbar />
            <Providers>
              <ContextProvider >
              <SubscribeModal />
                { children }
                <Footer />
              </ContextProvider>
            </Providers>
            
          </SessProvider>
        </body>
    </html>
  )
}