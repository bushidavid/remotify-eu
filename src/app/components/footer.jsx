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
              <p className="font-bold ">Company</p>
              <Link href="/">About RemotifyEurope</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Support</Link>
              <Link href="/">Contact Us</Link>
          </div>
          <div className="flex flex-col col-start-3 col-span-2">
            <p className="font-bold ">For candidates</p>
              <Link href="/">Sign Up with RemotifyEurope</Link>
              <Link href="/">Browse remote jobs</Link> 
          </div>
          <div className="flex flex-col col-start-5 col-span-2">
            <p className="font-bold ">For companies</p>
              <Link href="/">Create a company profile</Link>
              <Link href="/">Post a remote job</Link> 
          </div>
          <div className="col-start-7 flex flex-row col-span-2 h-10 w-40 ">
            <FaInstagram size={28} />
            <FaLinkedinIn size={28}/>
            <FaXTwitter size={28} />
          </div>
      </div>
      <div className="">&copy; 2024 RemotifyEurope - All Rights Reserved</div>
    </div>
  )
}
