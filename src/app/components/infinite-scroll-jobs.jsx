'use client';

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import JobList from "./job-list";
import { fetchJobs } from "../actions/actions";
import Image from "next/image";


export default function InfiniteScrollJobs({ initialJobs }) {

    const [jobs, setJobs] = useState(initialJobs);
    const [limit, setLimit] = useState(10);
    const [ref, inView] = useInView();
    const [showSpinner, setShowSpinner] = useState(true);

    const loadMoreJobs = async () => {
        const newLimit = limit + 10;
        console.log(newLimit);
        const newJobs = await fetchJobs(newLimit);

        console.log("printing more jobs", newJobs);

        if(newJobs?.length) {
            setLimit(newLimit);
            setJobs((prev) => [
                ...newJobs
                ]
            )
        }

    }

    useEffect(() => {
        if(inView) {
            loadMoreJobs()
        }
    }, [inView]);
    


    const featuredJobs = jobs.filter(job => job.featured);
    const notFeaturedJobs = jobs.filter(job => job.featured === false);


    return (
        <section className='w-screen flex flex-col justify-center items-center'>
            <JobList key={Math.random()} jobs={featuredJobs} title={"Latest Remote Jobs"} />
            <JobList key={Math.random()} jobs={notFeaturedJobs} />

            {/* loading spinner */}
            <div
                ref={ref}
            >
                <Image src={'/loading.svg'} height={100} width={100} alt="loading"/> 
            </div>
        </section>
    )
}
