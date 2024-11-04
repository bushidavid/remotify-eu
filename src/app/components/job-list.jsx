'use client';

import { FilterContext } from '../context/store';
import Job from './job';
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';


const JobList = ({ jobs, title,  companyId }) => {

    return ( 
        <div className="flex flex-col w-full max-w-7xl justify-center items-center motion-reduce">
            <div className="flex flex-col align-center w-full h-full ">

                { 
                    jobs.map(job => (
                        <Job key={job.id} 
                            id={job.id} 
                            jobLogoUrl={job.logo_url} 
                            title={job.job_title}  
                            worldwide={job.worldwide} 
                            expiration={job.expiration_date} 
                            country={job.countries} 
                            salaryMin={job.salary_range_min} 
                            salaryMax={job.salary_range_max} 
                            currency={job.currency} 
                            experience={job.experience} 
                            featured={job.featured}
                            companyName={job.company_name}
                            tags={job.tags}
                            created_at={job.created_at}
                            companyId={companyId}
                        />
                    ))
                    
                }
            </div>
        </div>

);
}
 
export default JobList;