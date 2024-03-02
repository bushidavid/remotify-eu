'use client';

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import JobList from "./job-list";
import { getCompanyJobs } from "../actions/actions";
import Image from "next/image";
import JobListEdit from "./job-list-edit";

const revalidate = 0;

const today = new Date(Date.now());

export default function InfiniteScrollJobsCompany({ initialJobs, companyId }) {

    console.log(companyId)

    const [jobs, setJobs] = useState(initialJobs);
    const [limit, setLimit] = useState(24);
    const [ref, inView] = useInView();
    const [showSpinner, setShowSpinner] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const loadMoreJobs = async () => {

        const timeOfLastJob = jobs.length > 0 ? jobs[jobs.length - 1].created_at : today; 

        const newLimit = limit + 24;
        const newJobs = await getCompanyJobs(newLimit, timeOfLastJob, companyId);

        if(newJobs?.length) {
            setLimit(newLimit);
            setJobs((prev) => [
                ...(prev?.length ? prev : []),
                ...newJobs
                ]
            )
        } else {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if(inView) {
            loadMoreJobs()
        }
    }, [inView]);
    


    const featuredJobs = jobs?.filter(job => job.featured);
    const notFeaturedJobs = jobs?.filter(job => job.featured === false);


    return (

         jobs?.length > 0 ? 
            ( 
            <section className='w-full flex flex-col justify-center items-center'>
                    <JobListEdit key={Math.random()} jobs={featuredJobs} title={"Your Latest Posted Jobs"} companyId={companyId}/>
                    <JobListEdit key={Math.random()} jobs={notFeaturedJobs} companyId={companyId}/>

                    {/* loading spinner */}
                    <div
                        ref={ref}
                    >
                        {isLoading && <Image src={'/loading.svg'} height={100} width={100} alt="loading"/> }
                    </div>
                </section> 
           ) : (
            <section className='w-screen h-screen flex flex-col justify-center items-center'>
                <h1 className="text-4xl pt-10">You have not posted any jobs yet</h1>
            </section> 
           )
        
    )
}
