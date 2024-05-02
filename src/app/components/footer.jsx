'use client';

import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useContext } from "react";
import { FilterContext } from "../context/store";

export default function Footer() {

  const context = useContext(FilterContext);

  return (
    <div className="flex flex-col w-full text-white items-center text-xs bg-remotify-db relative bottom-0">
      <div className="flex w-full justify-center mb-2">
            <div className="flex gap-6 text-slate-400">
              <Link href="https://www.instagram.com/remotifyeurope/" ><FaInstagram size={28}></FaInstagram></Link>
              <Link href="https://www.linkedin.com/company/remotifyeurope/" ><FaLinkedinIn size={28}/></Link>
              <Link href="https://twitter.com/Remotify_Europe" ><FaXTwitter size={28} /></Link>
            </div>
      </div>
      <div className="text-slate-400">&copy; 2024 RemotifyEurope - All Rights Reserved</div>
      <div className="text-slate-400 flex flex-row">
        <p className="pb-1">
          <Link href={'/terms-of-service'} className="hover:underline">Terms of Service</Link>
          <span> - </span>
          <Link href={'/privacy-policy'} className="hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}