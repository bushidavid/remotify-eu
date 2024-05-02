'use client';

import Image from "next/image"
import Link from "next/link"
import { Categories } from "../../../lib/departments"
import { useState } from "react"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Navbar() {

    const [ open, setOpen ] = useState(false);

    const router = useRouter();

    const handlePostNewJob = () => {
        router.push('/contact-us'); 
    }


  return (
    <nav className="bg-remotify-db w-full sticky top-0 z-50 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <Link href={'/'}><Image src={'/remotify.png'} alt="remotify_logo" height={100} width={100} /></Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex items-center justify-center">
                <div className="flex items-center justify-center space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    
                    {/* <Link
                    href="#"
                    className="font-poppins text-md text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium "
                    >
                        Companies
                    </Link> */}

                </div>
                </div>
            </div>
            <div className="hidden md:block mx-2">
                <button
                    onClick={handlePostNewJob}
                    href={'/contact-us'}
                    className="font-poppins bg-remotify-lb text-remotify-db rounded-md p-2 font-semibold"
                >
                    Post New Job
                </button>
            </div>
                {/*session ? (
                    <div class="relative ml-3">
                    <div onClick={() => setOpenProfile(prev => !prev)}>
                      <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">Open user menu</span>
                        <Image class="h-8 w-8 rounded-full" src={'/remotify.png'} alt="example" width={100} height={100} />
                      </button>
                    </div>
                    {openProfile && 
                        <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <a href={`/company/dashboard`} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0">Dashboard</a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0">All Jobs</a>
                            <a href={`/company/orders`} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0">Orders</a>
                            <a href={`/company/account`} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-1">Account Details</a>
                            <button onClick={signOut} class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
                        </div>
                    }
                    {/*  <div className="hidden md:block">
                    <button onClick={signOut}
                        className="font-poppins border-1 border-white bg-remotify-db text-white p-2 font-semibold"
                    >
                    Sign Out
                    </button>
                    </div>
                    }
                    </div> 
                ) :
                (
                    <div className="hidden md:block">
                        <button onClick={signIn}
                            className="font-poppins border-1 border-white bg-remotify-db text-white p-2 font-semibold"
                        >
                        Sign In
                        </button>
                    </div>
                )
            */}
            </div>
            
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        
        
    </nav>


  )
}