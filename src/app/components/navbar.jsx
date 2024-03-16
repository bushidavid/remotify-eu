'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CategoriesMenu from "./categories-menu";
import Hero from "./hero";


const Navbar = () => {

    
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
                <div className="flex p-5 justify-between w-full place-self-center  text-white font-sans text-sm">
                    
                    <Link href={'/'}><Image className="" alt="remotify_logo" src={'/remotify.png'} width={100} height={100} /></Link>
                    
                    <div className="flex flex-row text-md items-center justify-center ">
                        <div className="px-3">
                            <Link href="/about">About</Link>
                        </div>
                        <div className="px-3">
                            <Link href="/featured">Featured</Link>
                        </div>
                        <div className="px-3 flex flex-col cursor-pointer relative items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                            <p className="">Categories
                            </p>
                            { isDropdownVisible && <CategoriesMenu />}
                        </div>
                        <div className="px-3">
                            <Link href={'/contact-us'} className="bg-post-button hover:bg-red-700 text-white text-remotify-db px-6 rounded-md py-2">Post a Job</Link>   
                        </div>

                    </div>                
                </div>
        {currentPage == '/' && <Hero /> }
        
    </div>
    );
}
 
export default Navbar;