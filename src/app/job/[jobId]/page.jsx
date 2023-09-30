import JobHero from '@/app/components/job-hero';
import JobDetails from '@/app/components/job-details';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

const prisma = new PrismaClient();

export default async function Page({ params }) {

  console.log(params.jobId);

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
    const job = await prisma.job.findUnique({
      where: {
        id : jobId
      },
      include: {
        country_job_countryTocountry: true,
        department_job_departmentTodepartment: true
      }
    });

    
    const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
          ? value.toString() 
          : value;
      }
    
      // Use JSON.parse and JSON.stringify to apply the transformation
    const data = JSON.parse(JSON.stringify(job, transformBigIntToString));
    
    return data

  } catch (error) {
    console.log(error);
    return null;
  }
}

