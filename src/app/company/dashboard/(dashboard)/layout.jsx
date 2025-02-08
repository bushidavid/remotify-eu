import CompanySidebar from '../../components/company-sidebar'
import './global.css'
import { ContextProvider } from "@/app/context/store"

export const metadata = {
  title: 'RemotifyEurope - Company Dashboard',
  description: 'Find the best remote jobs in Europe and in European time zones',
  openGraph: {
    title: 'RemotifyEurope - Company Dashboard',
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
      <body className='w-screen h-screen flex flex-row font-poppins '>

          <ContextProvider >
            <CompanySidebar />
            { children }
          </ContextProvider>
      </body>
        
    </html>
  )
}