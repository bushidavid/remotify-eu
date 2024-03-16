import JobHero from '@/app/components/job-hero';
import JobDetails from '@/app/components/job-details';
import Image from 'next/image';
import supabase from '../../../../lib/config/supabaseClient';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export const revalidate = 1000;

export default async function Page({ params }) {

  const job = await getJobDetails(params.jobId);

  console.log(job);

  const postedDate = new Date(job.created_at);
  const expirationDate = new Date(job.expiration_date);

  const postedFormatted = postedDate.toLocaleString('lu-LU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const expirationFormatted = expirationDate.toLocaleString('lu-LU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <>
       {
        job ?  (
          <section className='w-8/12 mt-10 px-4'>
            
              <JobHero job={job} postedDate={postedFormatted}/>
            <section className='flex flex-row relative w-full min-w-full'>
              <div className='sticky top-0 w-[70%]'>
                <JobDetails job={job}/>
                <div className='mt-6'>
                  <Link href={job.job_link ? job.job_link : '/'} className='border-1 border-remotify-lb bg-remotify-lb px-6 rounded-md py-2 hover:bg-remotify-db hover:text-white'>Apply</Link>
                </div>
              </div>
              <div className='w-[30%] flex flex-col h-fit items-center mt-4 sticky top-10 z-50'>
                <Image src={job.logo_url ? job.logo_url : '/Logo.jpg'} width={200} height={200} alt="company_logo"></Image>
                <div className='flex flex-row mt-1'>
                  <FontAwesomeIcon icon={faLink} /><Link className="hover:underline ml-2" href={job.company_website ? job.company_website : '/'}>{job.company_name}</Link>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                        {job.tags.split(',').map(tag => (
                          <p className={`border-1 border-remotify-db rounded-md text-[14px] font-medium m-1 p-1`} key={tag}>{tag}</p>
                    ))}
                </div>
                <div>
                  <p>Valid Until: {expirationFormatted}</p>
                </div>
              </div>
            </section>
          </section>
            ) : (
              <Image src={'/loading.svg'} fill={true} alt="loading"/>
            )
       }
    </>
  )
}


export async function getJobDetails(jobId){
  try {

    const {data: job, error} = await supabase.rpc('get_jobs_details_v2', { jobid: jobId });
  
    
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

