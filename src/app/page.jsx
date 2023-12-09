import Image from 'next/image';
import JobList from './components/job-list';
import Hero from './components/hero';
import supabase from '../../lib/config/supabaseClient';
import { fetchJobs } from './actions/actions';
import InfiniteScrollJobs from './components/infinite-scroll-jobs';


export const revalidate = 0;

// async function getJobs(){

//   const { data, error } = await supabase.rpc('get_jobs');

//   console.log(error);

//   const result = data.map((job) => {
//     const transformBigIntToString = (key, value) => {
//       return typeof value === 'bigint' 
//         ? value.toString() 
//         : value;
//     };
  
//     // Use JSON.parse and JSON.stringify to apply the transformation
//     return JSON.parse(JSON.stringify(job, transformBigIntToString));
//   });

//   return result;
// }


export default async function Home() {

  const jobs = await fetchJobs(); 

  return (
    <section className='w-screen flex flex-col justify-center items-center'>
      <Hero />
      <InfiniteScrollJobs initialJobs={jobs} />
    </section>
  )
}
