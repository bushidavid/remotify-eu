import React from 'react'
import { fetchJobs } from '@/app/actions/actions';
import JobScroll from '@/app/components/job-scroll';
import AdvancedSearchSidebar from '../../../components/advanced-search-sidebar'

export default async function Page() {

    const jobs = await fetchJobs();

    return (
        <div className='w-full flex flex-row relative'>
            <div className='fixed z-49 bg-white py-4 rounded-lg shadow-xl w-full  ml-4'><h1 className='relative left-60'>Showing Results: {jobs.length}</h1></div>
            <div className='fixed w-[20%] h-full z-50'>
                <AdvancedSearchSidebar />
            </div>
            
            <div className='w-[80%] ml-[22%] z-38'>
              <div className='relative mt-10 top-10 z-38'>
                <JobScroll initialJobs={jobs} />
              </div>
                
            </div>
        </div>
    )
}
