import Hero from '../components/hero';
import { fetchJobs } from '../actions/actions';
import JobScroll from '../components/job-scroll';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import AdvancedSearch from '../components/advanced-search-sidebar';




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
        <section className='w-full flex flex-col justify-center items-center'>
          <Hero />
              <div className='w-full flex justify-center'>
                    <AdvancedSearch />
                    <JobScroll initialJobs={jobs} />
                    
                  
              </div>
            <Footer />
        </section>
    )
}