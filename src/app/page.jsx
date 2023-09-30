import Image from 'next/image';
import JobList from './components/job-list';
import Hero from './components/hero';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/utils/prisma';

async function getJobs(){

  const jobs = await prisma.job.findMany({
    include: {
      country_job_countryTocountry: true,
      department_job_departmentTodepartment: true
    }
  });

  console.log(jobs);

  const data = jobs.map((job) => {
    const transformBigIntToString = (key, value) => {
      return typeof value === 'bigint' 
        ? value.toString() 
        : value;
    };
  
    // Use JSON.parse and JSON.stringify to apply the transformation
    return JSON.parse(JSON.stringify(job, transformBigIntToString));
  });

  return data;
}


export default async function Home() {

  const jobsData = await getJobs();

  const jobs = await Promise.all(jobsData);

  return (
    <section className='w-screen flex flex-col justify-center items-center'>
      <Hero />
      <JobList jobs={jobs} />
    </section>
  )
}
