import Job from './job';

const JobList = ({ jobs, title }) => {

    return ( 
        <div className="flex flex-col w-full place-self-center justify-center items-center">
         
            <div className="flex flex-col align-center w-full max-w-6xl h-full ">
                <h1 className="text-4xl text-center mt-6 mb-2">{title}</h1>

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
                        />
                    ))
                }
            </div>

            <div className="text-center"><button  className="bg-white px-6 rounded-md py-2 hover:bg-remotify-db hover:text-white border-1 border-remotify-lb">Load More Jobs</button></div>
        </div>

);
}
 
export default JobList;