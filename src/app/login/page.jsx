import Footer from '../components/footer';
import SignInProviders from '../components/signin-providers';
import Link from 'next/link';
import LoginForm from '../components/login-form';



export default async function Page() {

    // const router = useRouter();

    // const search = useSearchParams('callbackUrl');

    // const [signInForm, setSignInForm] = useState({
    //   email: "",
    //   password: "",
    //   name: "",
    //   role: "admin"
    // })

    // const handleChange = (e) => {
    //   setSignInForm({
    //     ...signInForm,
    //     [e.target.name] : e.target.value
    //   })

    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch('api/register', {
    //         method: 'POST',
    //         headers: {
    //             'ContentType': 'application/json'
    //         },
    //         body: JSON.stringify({signInForm})
    //     })

    //     const userInfo = await response.json();

    //     console.log(userInfo);

    //     router.push('/company-signin')
    // }


  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center '>
        <div className='flex flex-row w-10/12   justify-center border-1 border-slate-300 rounded-xl shadow-2xl'>
          <div className='w-6/12 p-4 flex flex-col items-center'>
            <h1 className='row-span-full text-center pt-4 text-xl'>Sign In with a Provider</h1>
            <div className='h-[1px] w-[60%] bg-slate-300 mt-2 mb-6'></div>
            <SignInProviders />
          </div>
          <div className='w-[1px] h-full bg-slate-200'></div>
          <div className='w-6/12 p-4 flex flex-col items-center'>
            <h1 className='row-span-full text-center pt-4  text-xl'>Sign In with Credentials</h1>
            <div className='h-[1px] w-[60%] bg-slate-300 mt-2 mb-6'></div>
            <LoginForm />
          </div>
        </div>
        <div className='flex flex-col items-center gap-y-4'>
        <h1 className='pt-6 font-semibold text-lg'>New to RemotifyEurope?</h1>
        <Link className="text-sm underline" href={"/register"}>Sign Up Here</Link>
        {/* <h2>Forgot Password?</h2> */}
        </div>
      </div>
      <Footer />
    </>
  )
}
