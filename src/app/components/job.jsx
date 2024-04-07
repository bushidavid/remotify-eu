'use client'

import Link from 'next/link'
import Image from 'next/image';
import {Card, CardBody} from "@nextui-org/card";
import { updateJobClicks } from '../actions/actions';
import { useRouter } from 'next/navigation';
import { InView, useInView } from 'react-intersection-observer'

export default function Job({ ...props }) {

  const {ref, inView, entry} = useInView({
  });

  const date = new Date(props.created_at);
  const today = new Date(Date.now());

  const router = useRouter();

  const todayFormatted = today.toLocaleString('lu-LU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const formattedDate = date.toLocaleString('lu-LU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });


  const handleClick = async (e, jobId) => {

    e.preventDefault();

    console.log("inside handle click");
    const res = await updateJobClicks(jobId);

    if(!res){
      console.log(`unable to update job clicks for jobId: ${jobId}`)
    }

    router.push(`/job/${jobId}`)
  }

  const handleInView = async (jobId) => {
    
    const jobsInStorage = JSON.parse(localStorage.getItem("jobSeenArray")) || [];

    console.log(jobsInStorage);

    if (!jobsInStorage.includes(jobId)) {
      // If not present, add the current job ID to the list
      jobsInStorage.push(jobId);
  
      // Update localStorage with the updated list of job IDs
      localStorage.setItem("jobSeenArray", JSON.stringify(jobsInStorage));
  
      // Send a request to the API to update job views
      const result = await fetch('api/job-views', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId: jobId })
      });

      const json = await result.json();

      console.log(json);

      if(!json.ok){
        console.log(`unable to update job views for jobId: ${jobId}`)
      }

    }

  }
 

  return (
    <InView as='div' triggerOnce onChange={(inView, entry) => { if(inView) handleInView(props.id) }} >
      <Link href={`/job/${props.id}`} className='flex flex-col items-center justify-center mb-2' onClick={(e) => handleClick(e, props.id)}>
        <Card className={`w-11/12 md:w-10/12 flex flex-col items-center justify-center px-2 pb-0.5`}>
          <CardBody className='flex flex-row items-start justify-between bg-slate-50 rounded-xl mx-2 mt-1.5'>
            <div className="w-[30%] max-w-[30%] md:w-[15%] md:max-w-[15%] flex flex-col justify-around ">
                <Image className="rounded-full" src={props.jobLogoUrl ? props.jobLogoUrl : "/Logo.jpg"} alt="company_logo" width={70} height={70}></Image>
            </div>
            <div className='flex md:flex-row flex-col md:justify-start md:items-center w-full pl-2'>        
                <div className='w-full md:w-[40%] md:max-w-[40%]'>
                    <h1 className="text-base">{props.title}</h1>{/* <h1>{job.job_title}</h1> */}
                    <h2 className="text-sm">{props.companyName}</h2>
                    <h3 className='text-sm'>{props.salaryMin +" to " + props.salaryMax + ' ' + props.currency}</h3>
                </div>
                <div className='w-full md:min-w-[30%] md:max-w-[30%]'>
                    <h1 className='text-md'> {props.worldwide ? "Worlwide" : `Remote from ${props.country}`}</h1>
                </div>
              </div>

          </CardBody>
          <div className='flex flex-row flex-grow w-full my-1'>
            <p className='text-xs font-extralight px-2 pt-0.5 mx-1 my-0.5'>{(formattedDate === todayFormatted) ? "today" : formattedDate}</p>

            {props.tags?.split(',').map(tag => (
              <p className={`text-xs font-extralight rounded-full border-1 px-2 pt-0.5 mx-1 my-0.5`} key={tag}>{tag}</p>
            ))}
          </div>
        </Card>
      </Link>
    </InView>

    // <div>
    //   <Link className="relative flex flex-row items-center mb-4" href={`/job/${props.id}`}>
    //     {(formattedDate === todayFormatted) && <div className={`absolute -left-6 -top-4 z-50 bg-[#F72E9D] text-[#A0F4BC] text-lg font-bold rounded-full p-2`}>new</div>}
    //           <Card className={`sm:w-full w-96 hover:bg-remotify-lum `}> {/* ${props.featured ? 'bg-[#f7f1de]' : '' } */}
    //             <CardBody className='flex flex-col items-start justify-between md:items-center md:justify-between'>
                  
    //               <div className='flex md:flex-row flex-col md:justify-start md:items-center w-full pl-2 pb-2'>
    //                 <div className="w-[30%] max-w-[30%] md:w-[8%] md:max-w-[8%]">
    //                       <Image className="rounded-full" src={props.jobLogoUrl ? props.jobLogoUrl : "/Logo.jpg"} alt="company_logo" width={70} height={70}></Image>
    //                 </div>
                    
    //                 <div className='w-full md:w-[40%] md:max-w-[40%]'>
    //                     <h1 className="text-base">{props.title}</h1>{/* <h1>{job.job_title}</h1> */}
    //                     <h2 className="text-sm">{props.companyName}</h2>
    //                     <h3 className='text-sm'>{props.salaryMin +" to " + props.salaryMax + ' ' + props.currency}</h3>
    //                 </div>
    //                 <div className='w-full md:min-w-[30%] md:max-w-[30%]'>
    //                     <h1 className=''> {props.worldwide ? "Worlwide" : `Remote from ${props.country}`}</h1>
    //                 </div>
    //                 <div className="flex flex-row w-full flex-wrap md:w-[22%] md:max-w-[22%]">
    //                     {props.tags.split(',').map(tag => (
    //                       <p className={`border-1 border-remotify-db rounded-md text-[14px] font-medium m-1 p-1`} key={tag}>{tag}</p>
    //                     ))}
    //                 </div>
    //               </div>
    //               <div className='pt-1 mt-2 mr-auto'>
    //                 <p className='text-xs font-extralight'>Posted {(formattedDate === todayFormatted) ? "today" : formattedDate}</p>
    //               </div>
                  
    //             </CardBody >
    //           </Card>
    //       <div className={`absolute -right-12 rotate-90 bg-[#A0F4BC] text-[#F72E9D] font-bold text-lg rounded-md p-2 ${!props.featured ? "hidden" : ""}`}>featured</div>
    //   </Link>
    // </div>   
  )
}