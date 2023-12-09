import JobList from "@/app/components/job-list";
import supabase from "../../../../lib/config/supabaseClient";
import InfiniteScrollJobs from "@/app/components/infinite-scroll-jobs";
import { fetchJobs } from "@/app/actions/actions";

export const revalidate = 0;


async function getJobByCategory(search) {
    const {data: jobs, error} = await supabase
    .rpc('get_jobs', {loadlimit: 10});

    if(error){
        console.log(error);
        return;
    }

    const result = jobs.map((job) => {
        const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
            ? value.toString() 
            : value;
        };

        return JSON.parse(JSON.stringify(job, transformBigIntToString));
    })

    const filteredJobs = result.filter((job) => job.category.toLowerCase().includes(search.toLowerCase()));

    return filteredJobs;
}



export default async function Page({ params }) {

    const search = params.category.replace('%20', ' ');

    const jobs = await fetchJobs(undefined, undefined, search);

  return (
    <section className='w-screen flex flex-col justify-center items-center'>
       <InfiniteScrollJobs initialJobs={jobs} search={search} />
    </section>
  )
}
