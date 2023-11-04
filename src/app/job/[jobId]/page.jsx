import JobHero from '@/app/components/job-hero';
import JobDetails from '@/app/components/job-details';
import Image from 'next/image';
import supabase from '../../../../lib/config/supabaseClient';

export const revalidate = 0;

export default async function Page({ params }) {

  const job = await getJobDetails(params.jobId)

  return (
    <div className='w-full max-w-4xl  mt-10 px-4'>
       {
        job ?  (
          <>
            <JobHero job={job}/>
            <JobDetails job={job}/>
            <button className='mt-6 border border-1 border-remotify-lb bg-remotify-lb px-6 rounded-md py-2 hover:bg-remotify-db hover:text-white'>Apply</button>
          </>
            ) : (
              <Image src={'/loading.svg'} fill={true} alt="loading"/>
            )
       }
    </div>
  )
}


export async function getJobDetails(jobId){
  try {

    const {data: job, error} = await supabase.rpc('get_job_details', { jobid: jobId });

    console.log(error);
    
    const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
          ? value.toString() 
          : value;
      }
    
      // Use JSON.parse and JSON.stringify to apply the transformation
    const data = JSON.parse(JSON.stringify(job, transformBigIntToString));
    
    return data[0];

  } catch (error) {
    console.log(error);
    return null;
  }
}

