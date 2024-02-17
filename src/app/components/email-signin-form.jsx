'use client'

import { useSearchParams } from "next/navigation";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import {Input} from "@nextui-org/input";

import React from 'react'

export default function EmailSignInForm() {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
      setEmail(e.target.value)
      console.log(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("clicked on sign in"); 
    signIn('sendgrid', {email, callbackUrl})
  }

  return (
    <form onSubmit={handleSubmit}>
       <Input type="email" variant="underlined" label="Your Email" isRequired name="email" placeholder="email@example.com" onChange={handleChange}></Input>
        <button type="submit" className="mt-10 bg-slate-300 px-10 py-2 rounded-md" >Send MagicLink</button>
    </form>
  )
}
