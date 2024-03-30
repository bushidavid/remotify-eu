import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {

  return (
    <div className="flex flex-col w-full text-white items-center text-xs bg-remotify-db">
      <div className="w-11/12 md:w-11/12 h-fit md:h-48 md:grid md:grid-cols-8 mt-5 md:mt-20 relative bottom-0 justify-around items-stretch text-xs">
          <div className="flex flex-col md:col-start-1 md:col-span-2 md:grid-span md:items-center">
            <div className="flex flex-col font-poppins">
              <p className="text-white font-medium  text-sm md:text-lg mb-1 md:mb-2">Company</p>
              <Link href="/about" className="text-slate-400 text-xs hover:underline">About RemotifyEurope</Link>
              <Link href="/" className="text-slate-400 text-xs hover:underline">Careers</Link>
              <Link href="/contact-us" className="text-slate-400 text-xs hover:underline">Support</Link>
              <Link href="/contact-us" className="text-slate-400 text-xs hover:underline">Contact Us</Link>
              <Link href="/contact-us" className="text-slate-400 text-xs hover:underline">Submit Feedback</Link>
            </div>
          </div>
          <div className="flex flex-col md:col-start-3 md:col-span-2 md:items-center mt-3 md:mt-0">
            <div className="flex flex-col font-poppins">
              <p className="text-white font-medium text-sm md:text-lg mb-1 md:mb-2">For candidates</p>
                <Link href="/" className="text-slate-400 text-xs hover:underline">Sign Up with RemotifyEurope</Link>
                <Link href="/" className="text-slate-400 text-xs hover:underline">Browse remote jobs</Link> 
            </div>
          </div>
          <div className="flex flex-col md:col-start-5 md:col-span-2 md:items-center mt-3 md:mt-0">
            <div className="flex flex-col font-poppins">
              <p className="text-white font-medium  text-sm md:text-lg mb-1 md:mb-2">For companies</p>
                <Link href="/" className="text-slate-400 text-xs hover:underline">Create a company profile</Link>
                <Link href="/contact-us" className="text-slate-400 text-xs hover:underline">Post a remote job</Link> 
            </div>
          </div>
          <div className="md:col-start-7 flex flex-row md:col-span-2 md:my-0 my-1 h-10 md:w-40 w-full text-slate-300 gap-4 items-center justify-center">
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