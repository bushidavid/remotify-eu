'use client'
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PricingCard( { price, nickname, id } ) {    

  return (
    <div className={`w-60 p-6 my-4 mx-4 text-center h-[300px] border-1 border-slate-200 rounded-3xl pr-16 shadow-xl`}>
        <h1 className="text-black font-semibold text-2xl">{nickname}</h1>
        <p className="pt-2 tracking-wide">
            <span className={`text-3xl font-semibold `}>{(price / 100)}</span>
            <span className="text-gray-400 align-top">EUR</span>
        </p>
        <hr className="mt-4 border-1"></hr>
        <div className="pt-8 h-full">
            <div>
                <p className="font-semibold text-left">
                    <FontAwesomeIcon icon={faCheck} style={{color: "#142c42",}} />
                    <span className="pl-2">
                        Simply One Job Post
                    </span>
                </p>
            </div>
            <div>
                <p className="font-semibold text-gray-400 text-left pt-5">
                   
                </p>
            </div>
            <div>
                <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                        done
                    </span>
                    <span className="pl-2">
                        <span className="text-black">5 TB</span> cloud storage
                    </span>
                </p>
            </div>
            <div className="mt-20">
                <Link href={`/newjob/${id}`} className="w-full py-4 px-4 bg-remotify-lb rounded-xl mt-10 text-white">
                    <span className="font-medium text-black" >
                        Choose Plan
                    </span>
                </Link>
            </div>
        </div>
    </div>
  )
}
