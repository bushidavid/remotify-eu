import Image from 'next/image';
import JobList from './components/job-list';
import Hero from './components/hero';
import supabase from '../../lib/config/supabaseClient';


async function getJobs(){

  const { data } = await supabase.rpc('get_jobs');

  console.log(data);

  const result = data.map((job) => {
    const transformBigIntToString = (key, value) => {
      return typeof value === 'bigint' 
        ? value.toString() 
        : value;
    };
  
    // Use JSON.parse and JSON.stringify to apply the transformation
    return JSON.parse(JSON.stringify(job, transformBigIntToString));
  });

  return result;
}


export default async function Home() {

  const jobs = await getJobs();

  return (
    <section className='w-screen flex flex-col justify-center items-center'>
      <Hero />
      <JobList jobs={jobs} />
    </section>
  )
}
