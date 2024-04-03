import Hero from './components/hero';
import { fetchJobs } from './actions/actions';
import InfiniteScrollJobs from './components/job-scroll';
import {sgMail} from '../../lib/email.js'
import JobScroll from './components/job-scroll';
import Search from './components/search';



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
      <Search />
      <JobScroll initialJobs={jobs} />
    </section>
  )
}