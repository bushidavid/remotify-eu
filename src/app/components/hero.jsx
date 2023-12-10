import Image from "next/image";
import Search from "./search";

export default function Hero() {
  return ( 
    <div className="place-self-center mb-100 mt-10 relative ">
        <Image src={'/remote_work.jpg'} alt='remote_image' width={1152} height={300}></Image>
        <Search />
    </div>
  )
}
