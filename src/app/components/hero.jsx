import Image from "next/image";
import Search from "./search";
import Link from "next/link";

export default function Hero() {
  return ( 
    <div className="flex flex-col text-center justify-center gap-4 items-center w-full relative h-[380px] md:h-[633px] bg-remotify-db">
        
          <h1 className="text-white text-4xl w-full md:text-8xl md:w-8/12 font-medium">Find your Dream <span className="text-teal-400">Remote</span> Job with Us!</h1>
          <p className="text:md md:text-lg pt-1 md:w-6/12 w-10/12 text-gray-300">Navigate the World of Opportunities with Our Comprehensive Job Portal, Connecting Talented Individuals in European Time Zones with their Dream Remote Careers.</p>
          <p className="text:md md:text-lg pt-1 md:w-6/12 w-10/12 text-gray-300">Start Searching Now!</p>
          <div className="block md:hidden">
                <Link
                    href={'/contact-us'}
                    className="font-poppins bg-remotify-lb text-remotify-db rounded-md p-2 font-semibold"
                >
                    Post New Job
                </Link>
          </div>
       
    </div>
  )
}