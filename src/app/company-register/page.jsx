'use client'


import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a company Page
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
                <Input type="text" variant="underlined" label="Your Company Name" isRequired name="name" onChange={(e) => handleChange(e)}></Input>
            </div>
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
  )
}
