'use client';


import Job from './job';

const JobList = ({ jobs, title,  companyId }) => {

    return ( 
        <div className="flex flex-col w-full max-w-7xl justify-center items-center motion-reduce">
            <div className="flex flex-col w-11/12 h-full ">

                { 
                    jobs.map(job => (
                        <Job key={job.id} 
                            id={job.id} 
                            jobLogoUrl={job.logo_url} 
                            title={job.job_title}  
                            worldwide={job.worldwide} 
                            expiration={job.expiration_date} 
                            country={job.country_names} 
                            salaryMin={job.salary_range_min} 
                            salaryMax={job.salary_range_max} 
                            currency={job.currency} 
                            experience={job.exp_names} 
                            featured={job.featured}
                            companyName={job.company_name}
                            tags={job.tag_names}
                            created_at={job.created_at}
                            companyId={companyId}
                            category={job.category}
                        />
                    ))
                    
                }
            </div>
        </div>

);
}
 
export default JobList;