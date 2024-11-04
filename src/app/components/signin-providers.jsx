"use client";

import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";




function SignInProviders({ callBackUrl }) {
  return (
    <div className="h-full flex flex-col ">
        <button className="flex flex-row w-96 justify-center items-center gap-x-4 mt-10 bg-white shadow-md hover:shadow-xl transition-shadow border-1 border-slate-200 px-10 py-4 rounded-md" onClick={() => signIn('google', {callbackUrl: callBackUrl})}><FcGoogle size={50}/> Sign up with Google</button>
        {/* <button className="flex flex-row justify-center items-center gap-x-4 w-96  mt-10 bg-white shadow-md hover:shadow-xl transition-shadow border-1 border-slate-200 px-10 py-4 rounded-md" onClick={() => signIn('linkedin', {callbackUrl: callBackUrl})}> <FaLinkedin size={50} color='#0e76a8'/> Sign up with LinkedIn </button> */}
    </div>
  )
}

export default SignInProviders