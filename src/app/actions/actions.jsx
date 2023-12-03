'use server'

import supabase from "../../../lib/config/supabaseClient"

export async function fetchJobs(limit = 10){

    const { data, error } = await supabase.rpc('get_jobs', {loadlimit: limit});

    const result = data.map((job) => {
        const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
            ? value.toString() 
            : value;
        };
    
    
        // Use JSON.parse and JSON.stringify to apply the transformation
        return JSON.parse(JSON.stringify(job, transformBigIntToString));
    })

    return result;
}