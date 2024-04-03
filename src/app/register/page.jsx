'use client'


import { Input } from '@nextui-org/react'
import { useState } from 'react'

export default function Page() {

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    name: ""
  })

    const handleChange = () => {
      setSignInForm({
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit = async () => {
        
    }


  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
            Create a Company Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" >
            <div>
              <Input type="email" variant="underlined" label="Your Email" isRequired name="email" placeholder="email@example.com" onChange={handleChange}></Input>
              </div>
            <div>
              <div className="flex items-center justify-between">
              <Input type="password" variant="underlined" label="Password" isRequired name="password" onChange={handleChange}></Input>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-remotify-db hover:bg-remotify-lb hover:text-remotify-db px-3 py-1.5 text-sm font-semibold leading-6 text-white "
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
