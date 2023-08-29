import Image from "next/image"

export default function Hero() {
  return ( 
    <div className="place-self-center mb-100 mt-10 relative ">
        <Image src={'/remote_work.jpg'} width={896} height={300}></Image>
        <div className="absolute flex flex-row w-10/12 justify-center align-center bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <input placeholder="Search for a job" className="bg-slate-100 border border-1 border-remotify-lb w-10/12 rounded-lg py-2 my-2"></input>
            <button className="w-16 bg-remotify-lb rounded-lg my-2 ml-10 text-white">Search</button>
        </div>
    </div>
  )
}
