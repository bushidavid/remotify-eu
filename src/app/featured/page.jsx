import JobList from "../components/job-list";
import supabase from "../../../lib/config/supabaseClient";

export const revalidate = 0;

async function getFeaturedJobs() {
  const {data: jobs, error} = await supabase
  .rpc('get_jobs');

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

  const filteredJobs = result.filter((job) => job.featured);

  return filteredJobs;

}


export default async function Page() {

  const jobs = await getFeaturedJobs();

  return (
    <section className='w-screen flex flex-col justify-center items-center'>
        <JobList jobs={jobs} title="Featured Jobs" />
    </section>
  )
}
