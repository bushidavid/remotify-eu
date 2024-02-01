import Image from "next/image";
import Search from "./search";

export default function Hero() {
  return ( 
    <div className="place-self-center flex justify-center items-center flex-col mb-100 w-screen relative h-[300px] ">
        <div className="text-center">
          <h1 className="text-6xl text-orange-400">The Best Remote Job Platform in Europe</h1>
          <h2 className="text-xl pt-1 text-orange-300">Search for the best remote jobs in Europe and in European time zones</h2>
        </div>
        <Search />
    </div>
  )
}
