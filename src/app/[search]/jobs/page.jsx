import JobList from '@/app/components/job-list';
import React from 'react';
import supabase from '../../../../lib/config/supabaseClient';
import Image from 'next/image';
import InfiniteScrollJobs from '@/app/components/infinite-scroll-jobs';
import { fetchJobs } from '@/app/actions/actions';

export const revalidate = 0;

async function getJobs(search){

    
    const jobs = await fetchJobs(undefined, undefined, undefined, search); 

    const result = jobs.map((job) => {
        const transformBigIntToString = (key, value) => {
          return typeof value === 'bigint' 
            ? value.toString() 
            : value;
        };

        return JSON.parse(JSON.stringify(job, transformBigIntToString));
    })

    return result;
}


export default async function Page({ params }) {

    const jobs = await getJobs(params.search);

    console.log(jobs);

    return (
        <section className='w-screen flex flex-col justify-center items-center'>
        
                <InfiniteScrollJobs initialJobs={jobs} filter={params.search} search={""}></InfiniteScrollJobs>
                
        </section> 
    )
}
