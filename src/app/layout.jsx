import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import Providers from './providers'
import Footer from './components/footer'
import "@fortawesome/fontawesome-svg-core/styles.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RemotifyEurope',
  description: 'The best remote job board in Europe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen items-center no-scrollbar min-h-screen'>
      <Navbar />
        <Providers >
          
          { children }
        </Providers>
      <Footer />
        </body>
    </html>
  )
}
