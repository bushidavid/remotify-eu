'use client';

import { useEffect, useState } from "react";

import { fetchJobs } from "../actions/actions";
import Image from "next/image";
import JobList from "./job-list";

const revalidate = 0;

const today = new Date(Date.now());

export default function JobScroll({ initialJobs, search, filter }) {

    const [jobs, setJobs] = useState(initialJobs);
    const [limit, setLimit] = useState(24);
    const [empty, setEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreJobs = async () => {

        setIsLoading(true);

        const timeOfLastJob = jobs.length > 0 ? jobs[jobs.length - 1].created_at : today; 

        const newLimit = limit + 24;
        const newJobs = await fetchJobs(newLimit, timeOfLastJob, search ? search : "", filter);

        console.log("new fetched jobs: ", newJobs);

        if(newJobs?.length) {
            setLimit(newLimit);
            setJobs((prev) => [
                ...(prev?.length ? prev : []),
                ...newJobs
                ]
            )
            setIsLoading(false);
        } else {
            setEmpty(true);
            setIsLoading(false);
        }

    }

    const featuredJobs = jobs?.filter(job => job.featured);
    const notFeaturedJobs = jobs?.filter(job => job.featured === false);


    return (

         jobs?.length > 0 ? 
            ( 
            <section className='w-screen flex flex-col justify-center items-center'>
                <JobList key={Math.random()} jobs={featuredJobs} title={"Latest Remote Jobs"} />
                <JobList key={Math.random()} jobs={notFeaturedJobs} />
                { isLoading ? (<Image alt={'loading'} src={'/loading.svg'} width={100} height={100} />)
                    : (<button className="bg-remotify-lb hover:bg-[#2ab3af] px-6 py-2 rounded-md my-4" onClick={loadMoreJobs}>Load More Jobs</button>) 
                }
                { empty && <p className="text-red-400">no more jobs to show</p> }
            </section> 
           ) : (
            <section className='w-screen h-screen flex flex-col justify-center items-center'>
                <h1 className="text-4xl pt-10">No jobs <form action="" method="get"></form>ound in this category</h1>
            </section> 
           )
        
    )
}
