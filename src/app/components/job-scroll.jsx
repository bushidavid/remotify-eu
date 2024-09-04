'use client';

import { useEffect, useState } from "react";
import { useContext } from "react";

import { fetchJobs } from "../actions/actions";
import Image from "next/image";
import JobList from "./job-list";
import { FilterContext } from "../context/store";


const revalidate = 0;


const today = new Date(Date.now());

export default function JobScroll({ initialJobs, search, filter }) {

    const context = useContext(FilterContext);

    const [jobs, setJobs] = useState(initialJobs);
    const [jobsToDisplay, setJobsToDisplay] = useState([]);
    const [limit, setLimit] = useState(24);
    const [empty, setEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const loadMoreJobs = async () => {

        setIsLoading(true);

        const timeOfLastJob = jobs.length > 0 ? jobs[jobs.length - 1].created_at : today; 

        const newLimit = limit + 24;
        const newJobs = await fetchJobs(newLimit, timeOfLastJob, search ? search : "", filter);


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

    useEffect(() => {
       
        filterJobs();    
        
    }, [context.title, context.filter])

    const filterJobs = () => {

        let filteredJobs = jobs;

        if(context.title !== ""){
            filteredJobs = (filteredJobs.filter(job => job.job_title.toLowerCase().includes(context.title.toLowerCase())))
        }

        if(context.filter.length > 0){
            filteredJobs = context.filter.map(filter => {
                let temp = filteredJobs.filter(job => {console.log("printing full time property:", job[filter]); return job[filter] === true});
                return temp;
            })
        }

        let flattenedArray = filteredJobs.flat(Infinity);

        setJobsToDisplay(flattenedArray);
    }

    const featuredJobs = jobsToDisplay?.filter(job => job.featured);
    const notFeaturedJobs = jobsToDisplay?.filter(job => job.featured === false);


    return (

         jobsToDisplay?.length > 0 ? 
            ( 
            <section className='w-screen flex flex-col justify-center items-center'>
                <JobList key={Math.random()} jobs={featuredJobs} />
                <JobList key={Math.random()} jobs={notFeaturedJobs} />
                { isLoading ? (<Image alt={'loading'} src={'/loading.svg'} width={100} height={100} />)
                    : (<button className="bg-remotify-db text-white hover:bg-[#2ab3af] px-6 py-2 rounded-md my-4" onClick={loadMoreJobs}>Load More</button>) 
                }
                { empty && <p className="text-red-400">no more jobs to show</p> }
            </section> 
           ) : (
            <section className='w-screen h-screen flex flex-col justify-center items-center'>
                <h1 className="text-4xl pt-10">Nothing to see here yet</h1>
            </section> 
           )
        
    )
}