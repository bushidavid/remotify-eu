'use client';

import React, { use, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, singOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CategoriesMenu from "./categories-menu";
import Hero from "./hero";


const Navbar = () => {

    // const {session, loading} = useSession();

    const currentPage = usePathname();

    const [ isDropdownVisible, setIsDropdownVisible ] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    }

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    }


    return (  
        <div className="flex flex-col bg-cover w-full justify-between items-center bg-[linear-gradient(to_top_left,rgba(57,209,204,0.90),rgba(20,40,66,1)),url('/ben-everett-unsplash.jpg')]">
            <div className="flex p-5 justify-between w-full place-self-center  text-white font-sans">
                <div className=".logo__image">
                    <Link href="/" className=""><Image className="h-auto" alt="remotify_logo" src={'/remotify.svg'} width={50} height={115} /></Link>
                </div>
                <div className="flex flex-row text-md items-center justify-center ">
                    <div className="px-3">
                        <Link href="/featured">Featured</Link>
                    </div>
                    <div className="px-3 flex flex-col cursor-pointer relative items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                        <p className="">Categories
                        </p>
                        { isDropdownVisible && <CategoriesMenu />}
                    </div>
                    <div className="px-3">
                        <p>Job Seekers</p>
                    </div>
                    <div className="px-3">
                        <Link href="" >Companies</Link>
                    </div>
                    <div className="px-3">
                        <Link  href="/pricing" className="hover:bg-remotify-lb  border-1 border-remotify-lb bg-remotify-db text-white hover:text-slate-950 text-remotify-db px-6 rounded-md py-2">Post a Job</Link>   
                    </div>
                </div>
                {/*!loading && !session && (<div>
                    <Link href="/api/auth/signin" onClick={e => {
                        e.preventDefault();
                        signIn();
                    }}>Sign in</Link> 
                    Sign In
                </div>) */}
                {/*{session && (<div>
                    <Link href="/api/auth/signout" onClick={e => {
                        e.preventDefault();
                        singOut();
                    }}>Sign Out</Link> 
                    Sign Out
                ) }*/}
                {/*{!loading && !session && (<div>
                    <Link href="/components/register">Register</Link> 
                    Register
                </div>) } */}
                
            </div>
            {currentPage == '/' && <Hero /> }
        </div>
    );
}
 
export default Navbar;