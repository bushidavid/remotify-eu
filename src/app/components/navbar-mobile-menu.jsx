import Link from "next/link"

export default function NavbarMobileMenu({ session }) {
  return (
    <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link
                href="/"
                className="font-poppins text-gray-300 block rounded-md px-3 py-2 text-xs md:text-base font-regular"
                aria-current="page"
            >
                Home
            </Link>
            <Link
                href="/featured"
                className="font-poppins text-gray-300 block rounded-md px-3 py-2 text-xs md:text-base font-regular"
                aria-current="page"
            >
                Featured
            </Link>
            <Link
                href="/get-premium"
                className="font-poppins text-gray-300 block rounded-md px-3 py-2 text-xs md:text-base font-regular"
                aria-current="page"
            >
                Get Premium
            </Link>
            <Link
                href={'/pricing'}
                className="font-poppins text-white bg-remotify-lb text-remotify-db rounded-md p-2 mx-2 text-xs md:text-base font-regular"
                >
                Post New Job
            </Link>
            
            </div>
        </div>
  )
}
