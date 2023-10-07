import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";



export default function Job({ ...props }) {
  
  return (

    <div>
      <Link href={`/job/${props.id}`}>
              <Card className='sm:w-full w-96 mb-6 hover:bg-remotify-lum'>
                <CardBody className=''>
                  <div className='flex md:flex-row flex-col justify-around items-center'>
                    <div className="">
                        <Image className="rounded-full" src={props.jobLogoUrl ? props.jobLogoUrl : "/Logo.jpg"} alt="company_logo" width={70} height={70}></Image>
                    </div>
                    <div>
                        <h1 className="text-base">{props.title}</h1>{/* <h1>{job.job_title}</h1> */}
                        <h3 className="text-sm">{props.company}</h3>
                        <h3 className='text-sm'>{props.salaryMin +" to " + props.salaryMax}</h3>
                    </div>
                    <div>
                        <h1> <i>{props.worldwide ? "Worlwide" : `Remote from ${props.country}`}</i></h1>
                    </div>
                    <div className="flex md:flex-col flex-row">
                        {props.tags.map(tag => {
                            return <h1 className="bg-remotify-lb text-xs m-1" key={tag.id}>{tag.name + " "}</h1>
                        })}
                    </div>
                </div>
                </CardBody >
              </Card>
      </Link>
    </div>   
  )
}
