'use client';

import { createClient } from "../../../../lib/utils/supabase/client";

import Footer from '../../components/footer';
import SignInProviders from '../../components/signin-providers';
import Link from 'next/link';
import CreateUserForm from "@/app/components/create-user-form";
import { Suspense } from 'react';


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
        <div className='flex flex-col gap-y-2 md:flex-row w-11/12 md:w-10/12 md:max-w-7xl justify-center border-1 border-slate-300 rounded-xl shadow-2xl mt-10 mb-4'>
          <div className='w-full h-[60%] md:h-full md:w-6/12 md:p-4 flex flex-col items-center order-1 md:order-2'>
            <h1 className='row-span-full text-center pt-4 text-base md:text-xl'>Create New User</h1>
            <div className='h-[1px] w-[60%] bg-slate-300 mt-2 mb-2 md:mb-6'></div>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateUserForm />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
