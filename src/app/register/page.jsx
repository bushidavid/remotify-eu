'use client'


import { Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';

const PWD_REGEX = /^(?=.*[!@#$%^&*()-+=])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d!@#$%^&*()-+=]{8,24}$/;
const EMAIL_REGEX = /^(?=.{1,30}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const NAME_REGEX = /^.{1,50}$/

export default function Page() {

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState();

    const router = useRouter();


    const handleSubmit = async (e) => {

        e.preventDefault();

        const v1 = NAME_REGEX.test(name);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        const response = await fetch('/api/register', 
          {
            method: 'POST',
            headers: {   
              ContentType: 'application/json',
            },
            body: JSON.stringify({email, pwd, name})
          }
        )

        const res = await response.json();

        if(res.ok){
          setSuccess(true);
          return;
        }

        if(!res.ok){
          setSuccess(false);

          switch(res.status){
            case 409 : setErrMsg("User Already Exists");
              break;
            default : setErrMsg("Something Went Wrong. Please Try Again. ")
          }
        }
        
    }     
    
    useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])
    

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
      setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {

      if(success){
        setTimeout(() => router.push('/signin'), 2000);
      }

    }, [success])


  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
            Create a Company Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4"  >
            <div>
              <Input type="text" variant="underlined" label="Company Name" isRequired name="name" placeholder="" value={name} onChange={(e) => setName(e.target.value)}></Input>
              </div>
            <div>
              <Input type="email" variant="underlined" label="Email" isRequired name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
              </div>
            <div>
              <div className="flex items-center justify-between">
                <Input 
                  description="Password should be between 8 to 24 chars and contain: one uppercase letter, one symbol, one number"
                type="password" variant="underlined" label="Password" isRequired name="password" value={pwd} onChange={(e) => setPwd(e.target.value)}></Input>
              </div>
            
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Input type="password" variant="underlined" label="Confirm Password" isRequired name="password" value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)}
                  errorMessage={!validMatch ? 'Passwords do not match' : ''}
                ></Input>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-remotify-db px-3 py-1.5 text-sm font-semibold leading-6 text-white disabled:opacity-60"
                disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </div>
            {
              success && <div className='text-center'>
                <p className='bg-green-200 p-2 rounded-lg text-green-700'>Successfully Registered (redirect in 2s...)</p>
              </div>}
            {
              (!success && errMsg != "") && <div className='text-center'>
              <p className='bg-red-200 p-2 rounded-lg text-red-700'>{errMsg}</p>
              </div>
            }
          </form>
        </div>
      </div>
    </>
  )
}
