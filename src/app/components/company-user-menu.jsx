"use client";

import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '../../../lib/utils/supabase/client';

export default function CompanyUserMenu() {

    const supabase = createClient();

    const [ profileMenuOpen, setProfileMenuOpen ] = useState(false);
    const [user, setUser ] = useState(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const router = useRouter();

    //close user menu when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ){
                setProfileMenuOpen(false);
            }
        }
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      const handleSignOut = async () => {        
        try {
            const { error } = await supabase.auth.signOut();
            
            if(error) throw error;
        } catch (error) {
            console.log("Error during sign out: ", error);
        }
    }

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setUser(session.user); // Update user state on login
            } else {
                setUser(null); // Clear user state on logout
            }
        });
    
        // Cleanup listener
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);


    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
            <div>
                <button ref={buttonRef} onClick={() => setProfileMenuOpen(prev => !prev)} type="button" className="relative flex rounded-full bg-gray-800 text-sm " id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <Image className="h-8 w-8 rounded-full border-2 border-white" src={'/Logo.png'} width={20} height={20} alt="profile_picture" /> 
                </button>
            </div>

            {profileMenuOpen && <div ref={menuRef} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <button onClick={() => {setProfileMenuOpen(false); router.push('/company/dashboard');}} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Dashboard</button>
                <button onClick={() => {setProfileMenuOpen(false); router.push('/company/alljobs'); }} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Listings</button>
                <button onClick={() => {setProfileMenuOpen(false); router.push('/company/orders'); }} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Orders</button>
                <button onClick={() => {setProfileMenuOpen(false); router.push('/company/account'); }} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Account</button>
                <button onClick={handleSignOut} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"tabIndex="-1" id="user-menu-item-2">Sign out</button>
            </div>}
            </div>
        </div>
    )
}
