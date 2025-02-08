import RegisterForm from '../../components/register-form';
import Footer from '../../components/footer';
import SignInProviders from '../../components/signin-providers';
import SelectUserRole from '../../components/select-user-role';


export const metadata = {
  title: 'RemotifyEurope - Register',
  description: 'Find the best remote jobs in Europe and in European time zones',
  openGraph: {
    title: 'RemotifyEurope - Register',
    description: 'Find the best remote jobs in Europe and in European Time Zones',
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/logo_opengraph.png` // Path to the Open Graph image in your public directory
    ],
  },
  twitter: {
    title: 'RemotifyEurope - Register',
    description: 'Find the best remote jobs in Europe and in European time zones at RemotifyEurope',
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/logo_opengraph.png`,  // Set Twitter image URL
  }
}

export default function Page() {


  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center '>
        <div className='flex flex-col md:flex-row w-11/12 md:w-10/12 justify-center border-1 border-slate-300 rounded-xl shadow-2xl my-10 md:my-0'>
          <div className='w-full md:w-6/12 p-4 flex flex-col items-center md:order-1 order-2'>
            <h1 className='row-span-full text-center pt-4 text-xl'>Sign Up with a Provider</h1>
            <div className='h-[1px] w-[60%] bg-slate-300 mt-2 mb-6'></div>
            <SelectUserRole />

          </div>
          <div className='w-[1px] h-full bg-slate-200'></div>
          <div className='w-full md:w-6/12 p-4 flex flex-col items-center order-1 md:order-2'>
            <h1 className='row-span-full text-center pt-4  text-xl'>Sign Up with Credentials</h1>
            <div className='h-[1px] w-[60%] bg-slate-300 mt-2 mb-6'></div>
            <RegisterForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
