'use server'

import { revalidatePath } from "next/cache";

import supabase from "../../../lib/config/supabaseClient";

var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

export async function fetchJobs(limit = 24, lastLoadedTime = currentTime, search = "", filter = ""){

    console.log(search);

    const { data, error } = await supabase.rpc('get_jobs_v4', {loadlimit: limit, lastloadedtime: lastLoadedTime, p_category: search, p_search: filter});

    if(error){
        console.log(error);
    }

    const result = data.map((job) => {
        const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
            ? value.toString() 
            : value;
        };
    
    
        // Use JSON.parse and JSON.stringify to apply the transformation
        return JSON.parse(JSON.stringify(job, transformBigIntToString));
    })

    revalidatePath("/");

    return result;
}