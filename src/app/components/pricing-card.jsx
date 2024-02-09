'use client'
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiCircleCheck } from "react-icons/ci";
import { BsCurrencyEuro } from "react-icons/bs";

export default function PricingCard( { price, nickname, id, features, description} ) {    

  return (
    <div className={`w-80 flex flex-col py-4 px-10 ${nickname === 'Enterprise' ? "bg-gray-100 rounded-lg" : ""}`}>
        <div className="w-full ">
            <div className={`w-fit rounded-lg bg-remotify-lb text-white py-1 px-2 mb-1 text-sm ${nickname == 'Enterprise' ? "" : "invisible"}`}><p>Best Deal</p></div>
            <h1 className="text-black font-semibold text-2xl">{nickname}</h1>
            <h2 className="text-slate-600 text-sm">{description}</h2>
            {nickname == "Custom" ? ( <p className={` mb-4 mt-10 text-3xl`}>Contact Us</p>) : ( <p className={` mb-4 mt-10 text-3xl`}>€ {(price / 100)}</p>)}

        </div>
        <div className="w-full">
            {nickname == "Custom" ?
                (
                    <Link href={`/contact-us`} className="py-4 px-4 my-6 bg-remotify-db rounded-lg text-white">
                            Ask For a Quote
                    </Link>
                ) 
                : (
                    <Link href={`/newjob/${id}`} className="py-4 px-4 my-6 bg-remotify-db rounded-lg text-white">
                        Choose Plan
                    </Link>
                )
            }
        </div>
        { nickname != "Custom" && 
            <div className="pt-8 h-full flex flex-col items-start w-full">
                <h1 className="text-sm font-medium">This includes:</h1>
                {features?.map(feature => {
                    return (
                    <div key={Math.random()} className="flex flex-row mt-2 mb-2">
                        <CiCircleCheck />
                        <p className="text-sm ml-2" key={Math.random()}>{feature.name}</p>
                    </div>)
                })}   
            </div>
        }   
    </div>
  )
}
