import React from "react";
import Link from "next/link";
import { signIn, singOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {

    // const {session, loading} = useSession();

    return (  
        <div className="flex p-5 justify-between w-full place-self-center bg-remotify-db text-remotify-lb">
            <div className="inline-block p-0 m-0">
                <Link href="/" className=""><Image className="" alt="remotify_logo" src={'/remotify.png'} width={100} height={50} /></Link>
            </div>
            <div>
                <Link href="./newjob">Post a new job</Link>
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