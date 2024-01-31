import JobList from '@/app/components/job-list';
import React from 'react';
import supabase from '../../../../lib/config/supabaseClient';
import Image from 'next/image';
import InfiniteScrollJobs from '@/app/components/infinite-scroll-jobs';
import { fetchJobs } from '@/app/actions/actions';

export const revalidate = 0;

// async function getJobs(search){

//     const jobs = await fetchJobs(); 

//     if(error){
//         console.log(error);
//         return;
//     }

//     const result = jobs.map((job) => {
//         const transformBigIntToString = (key, value) => {
//           return typeof value === 'bigint' 
//             ? value.toString() 
//             : value;
//         };

//         return JSON.parse(JSON.stringify(job, transformBigIntToString));
//     })

//     const filteredJobs = result.filter((job) => job.job_title.toLowerCase().includes(search.toLowerCase()));

//     return filteredJobs;
// }


export default async function Page({ params }) {

    return (
        <section className='w-screen flex flex-col justify-center items-center'>
        
                <InfiniteScrollJobs jobs={[]} search={params.search}></InfiniteScrollJobs>
                
        </section> 
    )
}
