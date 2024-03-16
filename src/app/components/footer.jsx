import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {

  return (
    <div className="flex flex-col w-full text-white items-center text-xs">
      <div className=" w-8/12 h-48 grid grid-cols-8 mt-20 relative bottom-0 justify-around items-stretch text-xs">
          <div className="flex flex-col col-start-1 col-span-2 grid-span items-center">
            <div className="flex flex-col">
              <p className="font-bold text-slate-300">Company</p>
              <Link href="/about" className="text-slate-400 text-xs hover:underline">About RemotifyEurope</Link>
              <Link href="/" className="text-slate-400 text-xs hover:underline">Careers</Link>
              <Link href="/" className="text-slate-400 text-xs">Support</Link>
              <Link href="/contact-us" className="text-slate-400 text-xs hover:underline">Contact Us</Link>
              <Link href="/contact-us" className="text-slate-400 text-xs hover:underline">Submit Feedback</Link>
            </div>
          </div>
          <div className="flex flex-col col-start-3 col-span-2 items-center">
            <div className="flex flex-col">
              <p className="font-bold text-slate-300">For candidates</p>
                <Link href="/" className="text-slate-400 text-xs hover:underline">Sign Up with RemotifyEurope</Link>
                <Link href="/" className="text-slate-400 text-xs hover:underline">Browse remote jobs</Link> 
            </div>
          </div>
          <div className="flex flex-col col-start-5 col-span-2 items-center">
            <div className="flex flex-col">
              <p className="font-bold text-slate-300">For companies</p>
                <Link href="/" className="text-slate-400 text-xs hover:underline">Create a company profile</Link>
                <Link href="/pricing" className="text-slate-400 text-xs hover:underline">Post a remote job</Link> 
            </div>
          </div>
          <div className="col-start-7 flex flex-row col-span-2 h-10 w-40 text-slate-300 gap-4 justify-center">
            <div className="flex gap-6">
              <Link href="/" ><FaInstagram size={28}></FaInstagram></Link>
              <Link href="https://www.linkedin.com/company/92876524/admin/feed/posts/?feedType=following" ><FaLinkedinIn size={28}/></Link>
              <Link href="https://twitter.com/Remotify_Europe" ><FaXTwitter size={28} /></Link>
            </div>
          </div>
      </div>
      <div className="text-slate-400">&copy; 2024 RemotifyEurope - All Rights Reserved</div>
    </div>
  )
}
