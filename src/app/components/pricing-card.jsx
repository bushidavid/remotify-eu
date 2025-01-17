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
    <div className={`w-80 flex flex-col py-4 px-4 shadow-xl rounded-xl border-1 border-slate-300    ${nickname === 'Enterprise' ? "border-1 bg-teal-50 border-teal-500" : ""}`}>
        <div className="w-full ">
            <div className={`flex items-end justify-end flex-grow mb-1 text-base font-light text-right ${nickname == 'Enterprise' ? "" : "invisible"}`}><p className="bg-remotify-lb w-fit text-white py-1 px-2 rounded-lg">Best Deal</p></div>
            <h1 className="text-black font-semibold text-2xl">{nickname}</h1>
            <h2 className="text-slate-600 text-sm">{description}</h2>
            {nickname === "Custom" ? (
                <p className="mb-2 mt-10 text-3xl">Contact us for:</p>
                ) : (
                <p className="mb-2 mt-10 text-3xl text-slate-700">
                    € {Math.floor(price / 100) + ','}
                    <span
                        className="text-sm"
                        style={{ verticalAlign: 'top', fontSize: '0.7em', position: 'relative', top: '0.2em' }}
                        >
                        {(price % 100).toString().padStart(2, '0')}
                    </span>
                </p>
            )}


        </div>
        
        { nickname != "Custom" ? 
            (<div className="h-full flex flex-col items-start w-full">
                {/* {nickname != "Basic" && <h1 className="text-sm font-medium">This includes:</h1>} */}
                {features?.map(feature => {
                    return (
                    <div key={Math.random()} className="flex flex-row items-center mt-2 mb-2">
                        <CiCircleCheck />
                        <p className="text-sm ml-1" key={Math.random()}>{feature.name}</p>
                    </div>)
                })}   
            </div>)
            : (
                <div className="h-full flex flex-col items-start w-full">
                    <div className="flex flex-row mt-2 mb-2 items-center">
                        <CiCircleCheck />
                        <p className="text-sm ml-1" >Bundles</p>
                        
                    </div>
                    <div className="flex flex-row mt-2 mb-2 items-center">
                        <CiCircleCheck />
                        <p className="text-sm ml-1" >Discounts</p>
                        
                    </div>
                    <div className="flex flex-row mt-2 mb-2 items-center">
                        <CiCircleCheck />
                        <p className="text-sm ml-1" >Quotations</p>
                        
                    </div>
                </div>
            )
        }   

        <div className="w-full mt-6 text-center">
            {nickname == "Custom" ?
                (
                    <Link href={`/contact-us`} className="block py-4 px-4 my-2 bg-remotify-db text-lg rounded-lg font-light text-white w-full">
                            Contact Us For
                    </Link>
                    
                ) 
                : (
                    <Link href={`/newjob/${id}`} className="block py-4 px-4 my-2 bg-remotify-db text-lg font-light rounded-lg text-white w-full">
                        Choose Plan
                    </Link>
                )
            }
        </div>
    </div>
  )
}
