import React from "react";
import Link from "next/link";
import { signIn, singOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {

    // const {session, loading} = useSession();

    return (  
        <div className="flex p-5 justify-between w-full place-self-center bg-remotify-db text-remotify-lb font-sans">
            <div className=".logo__image">
                <Link href="/" className=""><Image className="" alt="remotify_logo" src={'/remotify.svg'} width={50} height={115} /></Link>
            </div>
            <div className="flex flex-row text-md items-center justify-center ">
                <div className="px-3">
                    <Link href="">Featured</Link>
                </div>
                <div className="px-3">
                    <Link href="">Categories</Link>
                </div>
                <div className="px-3">
                    <Link href="">Companies</Link>
                </div>
                <div className="px-3">
                    <Link  href="/pricing" className="hover:bg-remotify-lb border border-1 border-remotify-lb bg-remotify-db text-white hover:text-slate-950 text-remotify-db px-6 rounded-md py-2">Post a Job</Link>   
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
    );
}
 
export default Navbar;