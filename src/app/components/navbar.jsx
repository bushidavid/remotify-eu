'use client';

import Image from "next/image"
import Link from "next/link"
import { Categories } from "../../../lib/departments"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Router from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const [ open, setOpen ] = useState(false);
    const [ profileMenuOpen, setProfileMenuOpen ] = useState(false);
    const { data: session, status } = useSession({
        onUnauthenticated() {redirect('/signin')}
    })

    const router = useRouter();


  return (
    <nav className="bg-remotify-db w-full sticky top-0 z-50 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <button
                type="button"
                className="font-poppins relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setOpen(prev => !prev)}
                >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
            */}
                <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                {/*
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
            */}
                <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>
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
                    <Link
                    href="/featured"
                    className="font-poppins text-md text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium "
                    >
                        Featured
                    </Link>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                {/* Profile dropdown */}
                <div className="relative ml-3">
                <div>
                    <button
                    type="button"
                    className="font-poppins text-md relative flex rounded-md hover:bg-gray-700 p-2 focus:outline-none text-gray-300 hover:text-white font-medium"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setOpen(prev => !prev)}
                    >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                        Categories
                    </button>
                </div>
                {/*
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            */}
                {open && <div
                    className="font-poppins absolute flex flex-col p-4 gap-1 right-0 z-10 mt-2 w-fit h-fit origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    {
                        Categories.map(category => {
                            return (
                                // <Link href={`/jobs/${category.value}`}  className=" px-2 text-remotify-db hover:rounded-lg hover:bg-remotify-lum"></Link>
                                    <Link className="hover:bg-slate-200 py-1 px-2 rounded-md" href={`/jobs/${category.value}`} key={category.id} onClick={() => setOpen(prev => !prev)} >{category.value}</Link>
                            )
                        })
                    }
                </div>
                }
                </div>
            </div>
                </div>
                </div>
            </div>
            <div className="hidden md:block mx-2">
                <Link
                    href={'/pricing'}
                    className="font-poppins bg-remotify-lb text-remotify-db rounded-md p-2 font-semibold"
                >
                    Post New Job
                </Link>
            </div>
                 {session ? (
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    
            

                    <div class="relative ml-3">
                      <div>
                        <button onClick={() => setProfileMenuOpen(prev => !prev)} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                          <span class="absolute -inset-1.5"></span>
                          <span class="sr-only">Open user menu</span>
                          <Image class="h-8 w-8 rounded-full" src="" alt="profile_picture" /> 
                        </button>
                      </div>
            

                       
                      {profileMenuOpen && <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <button onClick={() => {router.push('/company/dashboard')}} href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Dashboard</button>
                        <button onClick={() => {router.push('/company/alljobs')}} href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Listings</button>
                        <button onClick={() => {router.push('/company/orders')}} href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Orders</button>
                        <button onClick={() => {router.push('/company/account')}} href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Account</button>
                        <button onClick={signOut} href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
                      </div>}
                    </div>
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
            }
            {session ? (
                    <div className="md:hidden">
                    <button onClick={signOut}
                        className="font-poppins border-1 border-white bg-remotify-db text-white p-2 font-semibold"
                    >
                    Sign Out
                    </button>
                    </div>
                ) :
                (
                    <div className="md:hidden ">
                        <button onClick={signIn}
                            className="font-poppins border-1 border-white bg-remotify-db text-white p-2 font-semibold"
                        >
                        Sign In
                        </button>
                    </div>
                )
            }
            </div>
            
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        {open && <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link
                href="/featured"
                className="font-poppins text-gray-300 block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
            >
                Featured
            </Link>
            <Link
                href={'/pricing'}
                className="font-poppins bg-remotify-lb text-remotify-db rounded-md p-2 mx-2 font-semibold"
                >
                Post New Job
            </Link>
            
            </div>
        </div>
        }
        
    </nav>


  )
}