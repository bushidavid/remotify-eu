'use client';

import { useEffect, useState } from "react";
import { useContext } from "react";

import { fetchJobs } from "../actions/actions";
import Image from "next/image";
import JobList from "./job-list";
import { FilterContext } from "../context/store";


const revalidate = 0;


const today = new Date(Date.now());

export default function JobScroll({ initialJobs }) {

    const {
        filterTag,
        setFilterTag,
        filterCountry,
        setFilterCountry,
        filterCategory,
        setFilterCategory,
        filterExperience,
        setFilterExperience,
        filterJobType,
        title
      } = useContext(FilterContext);

    const [jobs, setJobs] = useState(initialJobs);
    const [jobsToDisplay, setJobsToDisplay] = useState([]);
    const [limit, setLimit] = useState(24);
    const [empty, setEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingJobs, setIsLoadingJobs] = useState(false);
    const [lastLoadedTime, setLastLoadedTime] = useState();


    const fetchFilteredJobs = async () => {
        setIsLoadingJobs(true);
        setEmpty(false);

        try {
            const newJobs = await fetchJobs(
                limit,
                today.toISOString(), // Reset timestamp for filters
                filterCategory,
                title,
                filterCountry,
                filterExperience,
                filterTag,
                filterJobType
            );

            setJobs(newJobs); // Replace the job list with new filtered results
            setJobsToDisplay(newJobs); // Update displayed jobs
            setLastLoadedTime(today.toISOString()); // Reset pagination timestamp
            if (newJobs?.length === 0) setEmpty(true);
        } catch (error) {
            console.error("Error fetching filtered jobs:", error);
        } finally {
            setIsLoadingJobs(false);
        }
    };


    const loadMoreJobs = async () => {
        setIsLoading(true);

        const timeOfLastJob = jobs.length > 0 
            ? new Date(jobs[jobs.length - 1].created_at).toISOString() 
            : today.toISOString();
    
        console.log("Fetching jobs from last loaded time:", timeOfLastJob);
        console.log("time of last job belongs to job:" , jobs[jobs.length - 1]);
    
        const newLimit = limit + 24;
        //setLimit(newLimit);
        try {
            const newJobs = await fetchJobs(
                newLimit,
                timeOfLastJob, // Use the last loaded timestamp for pagination
                filterCategory,
                title,
                filterCountry,
                filterExperience,
                filterTag,
                filterJobType
            );

            if (newJobs?.length > 0) {
                setJobs((prev) => [...prev, ...newJobs]); // Append new jobs
                setJobsToDisplay((prev) => [...prev, ...newJobs]); // Update displayed jobs

                // Update lastLoadedTime to the most recent job's created_at
                const latestJobTime = newJobs[newJobs.length - 1].created_at;
                setLastLoadedTime(new Date(latestJobTime).toISOString());
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
       
        fetchFilteredJobs();
        
    }, [title, filterTag, filterCountry, filterCategory, filterExperience, filterJobType]);

    const featuredJobs = jobsToDisplay?.filter(job => job.featured);
    const notFeaturedJobs = jobsToDisplay?.filter(job => job.featured === false);


    return (

        isLoadingJobs ?  
            ( 

                (<div className='w-full flex flex-col max-w-5xl justify-center items-center mt-2'>
                    <Image src={'/loading.svg'} width={300} height={300} alt='loading_svg'></Image>
                </div>)
                // <section className='w-full flex flex-col max-w-5xl justify-center items-center mt-2'>
                //     <JobList key={Math.random()} jobs={featuredJobs} />
                //     <JobList key={Math.random()} jobs={notFeaturedJobs} />
                //     { isLoading ? (<Image alt={'loading'} src={'/loading.svg'} width={100} height={100} />)
                //         : (<button className="bg-remotify-db text-white hover:bg-[#2ab3af] px-6 py-2 rounded-md my-4" onClick={loadMoreJobs}>Load More</button>) 
                //     }
                //     { empty && <p className="text-red-400">no more jobs to show</p> }
                // </section> 
           ) : (
            jobsToDisplay?.length > 0 ? 
                (
                
                    <section className='w-full flex flex-col max-w-5xl justify-center items-center mt-2'>
                        <JobList key={Math.random()} jobs={featuredJobs} />
                        <JobList key={Math.random()} jobs={notFeaturedJobs} />
                        { isLoading ? (<Image alt={'loading'} src={'/loading.svg'} width={100} height={100} />)
                            : (<button className="bg-remotify-db text-white hover:bg-[#2ab3af] px-6 py-2 rounded-md my-4" onClick={loadMoreJobs}>Load More</button>) 
                        }
                        { empty && <p className="text-red-400">no more jobs to show</p> }
                    </section> 
                )
                    :
                (
                    <div className='w-full flex flex-col max-w-5xl justify-center items-center mt-2'>
                        <p>No Jobs Found</p>
                    </div>
                )
           )
        
    )
}