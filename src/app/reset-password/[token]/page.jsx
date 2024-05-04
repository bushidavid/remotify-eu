'use client';

import { useState } from 'react';
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect } from 'react';
import { submitNewPassword } from '@/app/actions/actions';
import { useRouter } from 'next/navigation';

const PWD_REGEX = /^(?=.*[!@#$%^&*()-+=])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d!@#$%^&*()-+=]{8,24}$/;

export default function Page( { params } ) {

    const router = useRouter();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess ] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await submitNewPassword(params.token, pwd);

        setSuccess(response);
    }
    



  return (
    <>
        { !success ? (
            
            <div className="flex min-h-full min-w-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
                        Reset Your Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                    <Input type="password" variant="underlined" label="New Password" isRequired name="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
                        description="Password must be between 8 to 24 chars and contain: one uppercase letter, one symbol, one number"
                    ></Input>
                    </div>
                    <div>
                    <div className="flex items-center justify-between">
                    <Input type="password" variant="underlined" label="Confirm Password" isRequired name="matchPwd" value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)}
                        errorMessage={!validMatch ? 'Passwords do not match' : ''}
                    ></Input>
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-remotify-db px-3 py-1.5 text-sm font-regular leading-6 text-white shadow-sm hover:bg-remotify-db disabled:opacity-60"
                        disabled={!validPwd || !validMatch ? true : false}
                    >
                        Reset Password
                    </button>
                    </div>
                </form>
                
                </div>
                <div className='flex flex-row gap-5 text-sm justify-center mt-2'>
                    <p>Didn&apos;t request this password change?</p> <Link href={'mailto:support@remotifyeurope.com'} className='text-remotify-db hover:underline'>Contact Us</Link>
                </div>
            </div>
            ) : (
                <div className="flex min-h-full min-w-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
                            Reset Your Password
                        </h2>
                    </div>
                    <div>
                        <p className='text-center text-md md:text-xl text-gray-600'>Password Successfully Reset! You&apos;ll be redirect to the Login page...</p>
                    </div>
                </div>
            )
        }
    </>
  )
}
