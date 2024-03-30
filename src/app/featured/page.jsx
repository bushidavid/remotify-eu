import JobList from "../components/job-list";
import supabase from "../../../lib/config/supabaseClient";
import { fetchJobs } from "../actions/actions";

export const revalidate = 0;

async function getFeaturedJobs() {

  const jobs = await fetchJobs();

  const filteredJobs = jobs.filter((job) => job.featured);

  return filteredJobs;

}


export default async function Page() {

  const jobs = await getFeaturedJobs();

  return (
    <section className='w-screen flex flex-col justify-center items-center mt-4'>
        <JobList jobs={jobs} title="Featured Jobs" />
    </section>
  )
}
