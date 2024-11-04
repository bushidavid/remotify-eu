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

        const timeOfLastJob = jobs.length > 0 
            ? new Date(jobs[jobs.length - 1].created_at).toISOString() 
            : today.toISOString();
    
        // console.log("Fetching jobs from last loaded time:", timeOfLastJob);
    
        const newLimit = limit + 24;
        try {
            const newJobs = await fetchJobs(newLimit, timeOfLastJob, search || "", filter);
            // console.log("Fetched jobs:", newJobs);
    
            if (newJobs?.length) {
                setLimit(newLimit);
                setJobs((prev) => [...prev, ...newJobs]);
                setIsLoading(false);
            } else {
                setEmpty(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching more jobs:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
       
        filterJobs();    
        
    }, [context.title, context.filter, jobs]);

    const filterJobs = () => {
        let filteredJobs = jobs;
    
        if (context.title !== "") {
            filteredJobs = filteredJobs.filter(job =>
                job.job_title.toLowerCase().includes(context.title.toLowerCase())
            );
        }
    
        if (context.filter.length > 0) {
            context.filter.forEach(filterKey => {
                filteredJobs = filteredJobs.filter(job => job[filterKey] === true);
            });
        }
    
        setJobsToDisplay(filteredJobs);
    };

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
            <div className='flex items-center justify-center w-screen'>
                <Image src={'/loading.svg'} width={300} height={300} alt='loading_svg'></Image>
            </div>
           )
        
    )
}