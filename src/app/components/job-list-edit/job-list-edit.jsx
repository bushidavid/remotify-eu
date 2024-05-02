import JobEdit from '../job-edit/job-edit';

const JobListEdit = ({ jobs, title }) => {

    return ( 
        <div className="flex flex-col w-full justify-center items-center">
         
            <div className="flex flex-col align-center w-full max-w-6xl h-full ">
                {title && <h1 className="text-4xl text-center mt-6 mb-2">{title}</h1>}

                { 
                    jobs.map(job => (
                        <JobEdit key={job.id} 
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
                            compDescription={job.company_description}
                            jobDescription={job.job_description}
                            companyId={job.company_id}
                        />
                    ))
                }
            </div>

            
        </div>

);
}
 
export default JobListEdit;