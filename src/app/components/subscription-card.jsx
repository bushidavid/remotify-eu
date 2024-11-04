"use client";

import { signIn } from 'next-auth/react';
import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function SubscriptionCard({ title, reoccurrence, price, cadence, comment, className, id}) {

  const router = useRouter();

  const { data: session, status } = useSession();

  console.log(session);


  const handleSubscribe = async (plan) => {

    console.log("inside handle subscribe");
  
    if (session) {

      const res = await fetch('api/subscribe-payment', {
        method: 'POST',
          headers: {
              'ContentType': 'application/json'
          },
          body: JSON.stringify({
            priceId: [plan],
            email: session?.user?.email
          })
      })

      const response = await res.json();

      router.push(response.url)
      
    }else{
      signIn(null, {redirect: false, callbackUrl: `/plan=${plan}`})
    }

  };

  return (
    <div className={`flex flex-col w-10/12 md:w-[33%] bg-white h-[300px] justify-around rounded-l-lg rounded-r-lg shadow-lg ${className}`}>
        <div className='h-[20%] text-center'>
            <h1 className='text-2xl text-slate-800'>{title}</h1>
            <h2 className='text-md text-slate-500'>{reoccurrence}</h2>
        </div>
        <div className='text-center'>
            <h1 className='text-2xl text-bold text-slate-500'><span className='font-semibold'>{"€" +price/100 +" "}</span>{cadence}</h1>
        </div>
        <div className='text-center'>
            <h3 className='text-cyan-500 text-xs font-semibold pb-2'>{comment}</h3> 
            <button onClick={() => handleSubscribe(id)} className='px-6 py-2 bg-orange-500 hover:bg-remotify-db text-white transition duration-1000 shadow-lg hover:shadow-xl border-1 border-slate-200 rounded-xl'>Subscribe Now</button>
        </div>
    </div>
  )
}
