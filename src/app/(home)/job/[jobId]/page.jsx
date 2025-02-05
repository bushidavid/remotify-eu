import JobHero from '@/app/components/job-hero';
import JobDetails from '@/app/components/job-details';
import Image from 'next/image';
import supabase from '../../../../../lib/config/supabaseClient';
import Link from 'next/link';
import { FaLink } from "react-icons/fa6";
import ApplyButton from '@/app/components/apply-button';
import Footer from '@/app/components/footer';
import Subscribe from '@/app/components/subscribe';

export const revalidate = 1000;

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = (await params).jobId;
 
  // fetch data
  const job = await getJobDetails(id);
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `${job.job_title} - RemotifyEurope`,
    openGraph: {
      title: `${job.job_title} - RemotifyEurope`,
      description: 'Find the best remote jobs in Europe and in European time zones at RemotifyEurope',
      images: [job.logo_url, ...previousImages],
    },
    twitter: {
      title: `${job.job_title} - RemotifyEurope`,
      description: 'Find the best remote jobs in Europe and in European time zones at RemotifyEurope',
      image: job.logo_url,  // Set Twitter image URL
    }
  }
}

export default async function Page({ params }) {

  const job = await getJobDetails(params.jobId);

  const date = new Date(job.created_at);
  const expirationDate = new Date(job.expiration_date);


  const locale = 'en-US'; // Specify a default
  const expirationFormatted = expirationDate.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedDate = date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
       {
        job ?  (
          <section className='w-11/12 md:w-10/12 lg:w-8/12 mt-10'>
            
              <JobHero job={job} postedDate={formattedDate}/>
            <section className='flex flex-row relative w-full gap-x-4 min-w-full'>
              <div className='w-full md:w-[70%]'>
                <div className='w-full md:hidden flex flex-row justify-around mt-4'>
                    <div className='flex flex-col w-fit'>
                      <Image className='rounded-md w-fit' src={job.logo_url ? job.logo_url : '/Logo.jpg'} width={80} height={80} alt="company_logo"></Image>
                      <div className='flex flex-row justify-center items-center mt-1'>
                        <FaLink /><Link className="hover:underline ml-2" href={job.company_website ? job.company_website : '/'}>{job.company_name}</Link>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                            {job.tags.split(',').map(tag => (
                              <p className={`border-1 border-remotify-db text-xs font-medium rounded-full px-2 pt-0.5 mx-1 my-0.5 h-fit`} key={tag}>{tag}</p>
                        ))}
                    </div>
                </div>
                  <JobDetails job={job}/>
                  <div className='my-6'>
                    <ApplyButton jobId={job.id} url={job.job_link} />
                  </div>
                </div>
              {/* Desktop View */}
              <div className='w-[30%] md:flex flex-col h-fit items-center mt-4 gap-y-2 sticky top-16 z-50 hidden'>
                <Image className='rounded-md' src={job.logo_url ? job.logo_url : '/Logo.jpg'} width={100} height={100} alt="company_logo"></Image>
                <div>
                  <p className='font-semibold'>{job.company_name}</p>
                </div>
                <div className='flex flex-row justify-center items-center hover:underline'>
                  <FaLink /><Link className="hover:underline ml-2" href={job.company_website ? job.company_website : '/'}>Website</Link>
                </div>
                <div className="flex flex-row flex-wrap gap-x-1 justify-center">
                        {job.tags.split(',').map(tag => (
                          <p className={`text-sm font-light rounded-full border-1 px-2 pt-0.5 mx-1 my-1`} key={tag}>{tag}</p>
                        ))}
                </div>
                <div className='mb-4'>
                  <p className='text-sm font-light'>Open until {expirationFormatted}</p>
                </div>
                <Subscribe />
              </div>
            </section>
          </section>
            ) : (
              <Image src={'/loading.svg'} fill={true} alt="loading"/>
            )
       }
       <Footer />
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
        
        console.log("printing job details", data);

        return data[0];

    } catch (error) {

        console.log(error);
        return null;

    }
}
