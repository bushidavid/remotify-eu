'use client';

import React, { useState } from 'react'
import { Input } from '@nextui-org/react'
import { resetPassword } from '../actions/actions';

export default function Page() {

    const [ email, setEmail ] = useState("");
    const [ success, setSuccess ] = useState(false);
    const [ showForm, setShowForm ] = useState(true);
    const [ showError, setShowError ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await resetPassword(email);

        console.log(res);

        if(!res.ok){
            setSuccess(false);
            setShowError(true);
        }
        
        setSuccess(true);
        setShowForm(prev => !prev);

    }
    

  return (
    <>
        <div className='flex min-h-full min-w-full flex-col justify-center items-center px-6 py-12 lg:px-8'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
                Reset Your Password
            </h2>
            </div>

        {showForm && 
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 w-80'>
                <Input type="email" value={email} variant="underlined" label="Your Email" isRequired name="email" placeholder="email@example.com" onChange={(e) => setEmail(e.target.value)}></Input>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-remotify-db px-3 py-1.5 text-sm font-regular leading-6 text-white shadow-sm hover:bg-remotify-db"
                >
                    Reset Password
                </button>
                {showError && 
                    <div>
                        <p className='text-md text-red-500'>Invalid email</p>
                    </div>
                }
            </form>
        }
        {
            success && 
            <div>
                <p className='text-2xl text-gray-600'>Please check your inbox for a reset link!</p>
            </div>
        }
        
        </div>
    </>
  )
}
