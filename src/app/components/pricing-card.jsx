'use client'
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PricingCard( { price, nickname, id } ) {    

  return (
    <div className={`w-80 h-[450px] flex flex-col mx-2 items-center justify-around border-1 border-slate-200 rounded-3xl shadow-xl`}>
        <div className="pt-5 w-10/12 text-center">
            <h1 className="text-black font-semibold text-2xl">{nickname}</h1>
            <p className="pt-2 tracking-wide">
                <span className={`text-3xl font-semibold `}>{(price / 100)}</span>
                <span className="text-gray-400 align-top pl-1">EUR</span>
            </p>
            <hr className="mt-4 border-1 w-full"></hr>
        </div>
        <div className="pt-8 h-full flex flex-col items-start w-10/12">
        <div className="">
                <p className="font-semibold text-left">
                    <span className="pl-2">
                        <FontAwesomeIcon icon={faCheck} style={{color: "#142c42",}} />
                        <span className="pl-2">
                           One Job post
                        </span>
                    </span>
                </p>
            </div>
            <div>
                <p className="font-semibold text-left pt-5">
                   
                </p>
            </div>
            <div>
                <p className="font-semibold text-left">
                    <span className="pl-2">
                        <FontAwesomeIcon icon={faCheck} style={{color: "#142c42",}} />
                        <span className="pl-2">
                            Social media post sharing
                        </span>
                    </span>
                </p>
            </div>
            <div>
                <p className="font-semibold text-left pt-5">
                    <span className="pl-2">
                        <FontAwesomeIcon icon={faCheck} style={{color: "#142c42",}} />
                        <span className="pl-2">
                            Featured Post
                        </span>
                    </span>
                </p>
            </div>
            </div>
            <div className="mb-10">
                <Link href={`/newjob/${id}`} className="w-full py-4 px-4 bg-remotify-lb rounded-xl mt-10 text-white">
                    <span className="font-medium text-black" >
                        Choose Plan
                    </span>
                </Link>
            </div>
        
    </div>
  )
}
