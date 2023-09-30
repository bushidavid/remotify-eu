'use client'
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";

export default function PricingCard( { price, nickname, id } ) {    

  return (
    <div className={`w-90 p-8 my-6 text-center h-[500px] rounded-3xl pr-16 shadow-xl ${nickname === "Pro" ? "bg-remotify-db scale-110" : "bg-white" }`}>
        <h1 className="text-black font-semibold text-2xl">{nickname}</h1>
        <p className="pt-2 tracking-wide">
            <span className={`text-3xl font-semibold ${nickname === "Pro" ? "text-white" : ""}`}>{(price / 100)}</span>
            <span className="text-gray-400 align-top">EUR</span>
        </p>
        <hr className="mt-4 border-1"></hr>
        <div className="pt-8 h-full">
            <div>
                <p className="font-semibold text-gray-400 text-left">
                    <span className="material-icons align-middle">
                        done
                    </span>
                    <span className="pl-2">
                        Create <span className="text-black">one Job Post</span>
                    </span>
                </p>
            </div>
            <div>
                <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                        done
                    </span>
                    <span className="pl-2">
                        Flexible <span className="text-black">team meetings</span>
                    </span>
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
