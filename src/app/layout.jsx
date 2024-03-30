import './globals.css'
import { Roboto, Inter, Ubuntu_Mono, Montserrat } from 'next/font/google';
import Footer from './components/footer'
import Providers from './providers';
import NavbarComp from './components/navbar';
import {ContextProvider} from './context/store';
import Navbar2 from './components/navbar';


export const metadata = {
  title: 'RemotifyEurope',
  description: 'The best remote job board in Europe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen min-w-screen items-center no-scrollbar min-h-screen font-roboto'>
          <Navbar2 />
            <Providers>
              <ContextProvider >
                { children }
              </ContextProvider>
            </Providers>
          <Footer />
        </body>
    </html>
  )
}
