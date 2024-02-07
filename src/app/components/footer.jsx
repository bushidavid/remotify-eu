import Link from "next/link";
import {faInstagram, faLinkedinIn, faXTwitter} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {

  return (
    <div className="flex flex-col w-full bg-remotify-db text-white items-center">
      <div className=" w-8/12 h-48 grid grid-cols-8 mt-20 relative bottom-0 justify-around">
          <div className="flex flex-col col-start-1 col-span-2 grid-span ">
              <p className="font-bold text-slate-300">Company</p>
              <Link href="/about" className="text-slate-400 text-sm">About RemotifyEurope</Link>
              <Link href="/" className="text-slate-400 text-sm">Careers</Link>
              <Link href="/" className="text-slate-400 text-sm">Support</Link>
              <Link href="/contact-us" className="text-slate-400 text-sm">Contact Us</Link>
          </div>
          <div className="flex flex-col col-start-3 col-span-2">
            <p className="font-bold text-slate-300">For candidates</p>
              <Link href="/" className="text-slate-400 text-sm">Sign Up with RemotifyEurope</Link>
              <Link href="/" className="text-slate-400 text-sm">Browse remote jobs</Link> 
          </div>
          <div className="flex flex-col col-start-5 col-span-2">
            <p className="font-bold text-slate-300">For companies</p>
              <Link href="/" className="text-slate-400 text-sm">Create a company profile</Link>
              <Link href="/pricing" className="text-slate-400 text-sm">Post a remote job</Link> 
          </div>
          <div className="col-start-7 flex flex-row col-span-2 h-10 w-40 text-slate-300 gap-4">
            <Link href="/" ><FaInstagram size={28}></FaInstagram></Link>
            <Link href="https://www.linkedin.com/company/92876524/admin/feed/posts/?feedType=following" ><FaLinkedinIn size={28}/></Link>
            <Link href="https://twitter.com/Remotify_Europe" ><FaXTwitter size={28} /></Link>          
          </div>
      </div>
      <div className="text-slate-400">&copy; 2024 RemotifyEurope - All Rights Reserved</div>
    </div>
  )
}
