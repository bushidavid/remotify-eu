import Link from "next/link"

export default function Footer() {
  return (
    <div className="bg-remotify-db w-full h-48 grid grid-cols-6 text-white justify-center items-center mt-20 relative bottom-0">
        <div className="flex flex-col items-center justify-center col-start-1 col-span-2 grid-span ">
            <Link href="/">Dummy Link</Link>
        </div>
        <div className="flex flex-col items-center col-start-3 col-span-2">
            <Link href="/">Dummy Link</Link>
        </div>
        <div className="col-start-5 col-span-2 flex flex-col items-center">
            <Link href="/">Dummy Link</Link>
        </div>
    </div>
  )
}
