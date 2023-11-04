import JobList from '@/app/components/job-list';
import React from 'react';
import supabase from '../../../../lib/config/supabaseClient';
import Image from 'next/image';

export const revalidate = 0;

async function getJobs(search){

    const {data: jobs, error} = await supabase
        .rpc('get_jobs');

    if(error){
        console.log(error);
        return;
    }

    const result = jobs.map((job) => {
        const transformBigIntToString = (key, value) => {
          return typeof value === 'bigint' 
            ? value.toString() 
            : value;
        };

        return JSON.parse(JSON.stringify(job, transformBigIntToString));
    })

    const filteredJobs = result.filter((job) => job.job_title.toLowerCase().includes(search.toLowerCase()));

    return filteredJobs;
}


export default async function Page({ params }) {

    const jobs = await getJobs(params.search);

    return (
        <section className='w-screen flex flex-col justify-center items-center'>
        {
            jobs ? 
            (
                <JobList jobs={jobs} title={`'${params.search}' jobs...`}></JobList>
                
            )
            : (
                <Image src={'/loading.svg'} fill={true} alt="loading"/>
            )
        }
        </section> 
    )
}
