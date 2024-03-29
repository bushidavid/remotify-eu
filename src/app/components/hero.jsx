import Image from "next/image";
import Search from "./search";

export default function Hero() {
  return ( 
    <div className="flex flex-col text-center justify-center items-center mb-100 w-full relative h-[400px] md:h-[633px] bg-remotify-db">
        
          <h1 className="text-white text-5xl w-full md:text-8xl md:w-8/12 font-medium">Find your Dream Job with Us!</h1>
          <p className="text:md md:text-lg pt-1 md:w-6/12 w-8/12 text-gray-300">Navigate the World of Opportunities with Our Comprehensive Job Portal, Connecting Talented Individuals with their Dream Careers. Start Searching Now!</p>
          
       
    </div>
  )
}
