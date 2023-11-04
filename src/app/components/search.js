'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';
import supabase from "../../../lib/config/supabaseClient";


export default function Search() {
    const [searchText, setSearchText] = useState();

    const router = useRouter();
    

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        router.push(`/${searchText}/jobs`);

        return;
    }

  return (
    <>
        <form onSubmit={(e) => handleSearchSubmit(e)} className="absolute flex flex-row w-11/12 justify-center align-center bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <input placeholder="Search for a job" className="border-1 border-remotify-db w-10/12 rounded-lg py-2 px-2 my-2 outline-none" value={searchText} onChange={e => setSearchText(e.target.value)}></input>
            <button type="submit" className="w-16 bg-remotify-db border-1 border-remotify-lb rounded-lg my-2 ml-10 text-white hover:bg-remotify-lb hover:text-black">Search</button>
        </form>
    </>
  )
}
