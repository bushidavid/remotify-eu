'use client'


import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Page() {

    const router = useRouter();
    const {data: session, status} = useSession();

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  })

    const handleChange = (e) => {
      setSignInForm({
        ...signInForm,
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        signIn('credentials', {
          ...signInForm,
          redirect: false,
        });
    }

    //redirect to company page
    useEffect(() => {
      if (session) {
        router.push(`/company/${session.user.id}/dashboard`);
      }
    }, [session, router])

    
  return (
    <>
        <div className="flex min-h-full min-w-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
            Company Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <Input type="email" variant="underlined" label="Your Email" isRequired name="email" placeholder="email@example.com" onChange={(e) => handleChange(e)}></Input>
              </div>
            <div>
              <div className="flex items-center justify-between">
              <Input type="password" variant="underlined" label="Password" isRequired name="password" onChange={(e) => handleChange(e)}></Input>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-remotify-lb px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-remotify-db focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          
        </div>
        <div className='flex flex-row gap-5 text-sm justify-center mt-2'>
            <p>Not a member?</p> <Link href={'/register'} className='text-remotify-lb hover:text-gray-900'>Register</Link>
          </div>
      </div>
    </>
  )
}
