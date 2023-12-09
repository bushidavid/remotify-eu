import Link from 'next/link'
import Image from 'next/image';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";



export default function Job({ ...props }) {
  
  return (

    <div>
      <Link className="relative flex flex-row items-center mb-4" href={`/job/${props.id}`}>
              <Card className={`sm:w-full w-96 hover:bg-remotify-lum `}> {/* ${props.featured ? 'bg-[#f7f1de]' : '' } */}
                <CardBody className=''>
                  <div className='flex md:flex-row flex-col justify-start items-center w-full'>
                    <div className="w-[8%] max-w-[8%]">
                        <Image className="rounded-full" src={props.jobLogoUrl ? props.jobLogoUrl : "/Logo.jpg"} alt="company_logo" width={70} height={70}></Image>
                    </div>
                    <div className='w-[40%] max-w-[40%]'>
                        <h1 className="text-base">{props.title}</h1>{/* <h1>{job.job_title}</h1> */}
                        <h2 className="text-sm">{props.companyName}</h2>
                        <h3 className='text-sm'>{props.salaryMin +" to " + props.salaryMax + ' ' + props.currency}</h3>
                    </div>
                    <div className='min-w-[30%] max-w-[30%]'>
                        <h1 className=''> <i>{props.worldwide ? "Worlwide" : `Remote from ${props.country}`}</i></h1>
                    </div>
                    <div className="flex flex-row flex-wrap w-[22%] max-w-[22%]">
                        {props.tags.split(',').map(tag => (
                          <h1 className="border-1 border-remotify-db rounded-md bg-remotify-lb text-xs m-1 p-1" key={tag}>{tag}</h1>
                        ))}
                    </div>
                    
                  </div>
                </CardBody >
              </Card>
              <div className={`absolute -right-11 rotate-90 bg-green-300 rounded-md p-2 ${!props.featured ? "hidden" : ""}`}>Featured</div>
      </Link>
    </div>   
  )
}
