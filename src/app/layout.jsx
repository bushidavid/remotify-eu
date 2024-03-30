import './globals.css'
import { Roboto, Inter, Ubuntu_Mono, Montserrat } from 'next/font/google';
import Navbar from './components/navbar'
import SessProvider from './components/session-provider'
import Providers from './providers'
import Footer from './components/footer'


export const metadata = {
  title: 'RemotifyEurope',
  description: 'The best remote job board in Europe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen min-w-screen items-center no-scrollbar min-h-screen font-inter'>
        <SessProvider>
          <Navbar />
            <Providers>
              { children }
            </Providers>
          <Footer />
        </SessProvider>
        </body>
    </html>
  )
}
