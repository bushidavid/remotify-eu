'use client'


import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegisterForm from '../components/register-form';
import Footer from '../components/footer';
import SignInProviders from '../components/signin-providers';

export default function Page() {

    const router = useRouter();

    const [signInForm, setSignInForm] = useState({
      email: "",
      password: "",
      name: "",
      role: "admin"
    })

    const handleChange = (e) => {
      setSignInForm({
        ...signInForm,
        [e.target.name] : e.target.value
      })

      console.log(signInForm);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'ContentType': 'application/json'
            },
            body: JSON.stringify({signInForm})
        })

        const userInfo = await response.json();

        console.log(userInfo);

        router.push('/company-signin')
    }


  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center '>
        <div className='flex flex-row w-10/12 justify-center border-1 border-slate-300 rounded-xl shadow-2xl'>
          <div className='w-6/12 p-4 flex flex-col items-center'>
            <h1 className='row-span-full text-center pt-4 text-xl'>Sign Up with a Provider</h1>
            <div className='h-[1px] w-[60%] bg-slate-300 mt-2 mb-6'></div>
            <SignInProviders />
          </div>
          <div className='w-[1px] h-full bg-slate-200'></div>
          <div className='w-6/12 p-4 flex flex-col items-center'>
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
