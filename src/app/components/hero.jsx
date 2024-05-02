'use client'

import Image from "next/image";
import Search from "./search";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function Hero() {

  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const result = await fetch('/api/subscribe', {
      method: 'PUT',
      body: JSON.stringify({'email' : email }),
      headers: {
          "content-type": "application/json",
        },
  })
  }


  return ( 
    <div className="flex flex-col text-center justify-center gap-4 items-center mb-100 w-full relative h-full  bg-remotify-db">
          <h1 className="text-white text-4xl w-full md:text-8xl md:w-11/12 font-medium">Joins Us for Launch Day on <span className="text-remotify-lb">Tuesday June 4th, 2024</span></h1>
          <p className="text:md md:text-lg pt-1 md:w-8/12 w-10/12 text-gray-300">Contact us to join our waiting list and post a free job for launch day. </p>
          
          <div className="flex flex-col items-center gap-4 ">
                <Link
                    href={'/contact-us'}
                    className="font-poppins bg-remotify-lb text-remotify-db rounded-md p-2 font-semibold w-40"
                >
                    Post a Free Job
                </Link>
                <div className="flex flex-col mt-20 items-center justify-center font-medium">
                  <h3
                      className="text-2xl md:text-4xl leading-6 text-slate-50"
                      id="modal-title"
                  >
                      Subscribe to Our Free <span className="text-orange-400">Newsletter</span>
                  </h3>
                  <div className="mt-2">
                      <p className="text-sm md:text-base text-slate-300">
                        Get weekly remote jobs straight to your inbox
                      </p>
                  </div>
                  
                  
                  
                    <form id="subscribe" onSubmit={handleSubmit} className="flex flex-row w-full justify-center mt-2">
                      <input required type='email' value={email} placeholder='you@email.com' label="email" className=' w-6/12 rounded-tl-xl rounded-bl-xl px-2 focus:outline-none' onChange={(e) => setEmail(e.target.value)} />
                      <button form="subscribe" type="submit" className=" bg-orange-400 hover:bg-orange-500 px-2 rounded-tr-xl rounded-br-xl py-2">Subscribe</button>
                    </form>
                      
                  
                </div>
            </div>
       
    </div>
  )
}