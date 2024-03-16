import { signIn } from 'next-auth/react'

import React from 'react'

function SignInProviders() {
  return (
    <div className="flex flex-col">
        <button className="mt-10 bg-slate-300 px-10 py-2 rounded-md" onClick={() => signIn('google', {callbackUrl: "/company/abc"})}>Sign in with Google</button>
        <button className="mt-10 bg-slate-300 px-10 py-2 rounded-md" onClick={() => signIn('linkedin', {callbackUrl: "/company/abc"})}>Sign in with Linkedin</button>
    </div>
  )
}

export default SignInProviders