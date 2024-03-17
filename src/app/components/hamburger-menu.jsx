import Link from "next/link"

export default function HamburgerMenu() {
  return (
    <div className="flex flex-row text-md items-center justify-center ">
        <div className="px-3">
            <Link href="/about">About</Link>
        </div>
        <div className="px-3">
            <Link href="/featured">Featured</Link>
        </div>
        <div className="px-3 flex flex-col cursor-pointer relative items-center" >
            <p className="">Categories
            </p>
        </div>
        <div className="px-3">
            <Link href={'/contact-us'} className="bg-post-button hover:bg-red-700 text-white text-remotify-db px-6 rounded-md py-2">Post a Job</Link>   
        </div>

    </div>           
  )
}
