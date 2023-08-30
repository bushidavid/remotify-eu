import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";



export default function Job({ ...props }) {
  
  return (

  
    <Link href={`/job/${props.id}`}>
            <Card className='w-full mb-6 hover:bg-slate-100'>
              <CardBody className=''>
                <div className='flex flex-row justify-around items-center'>
                  <div className="">
                      <Image className="rounded-full" src={'/logo.jpg'} alt="company_logo" width={70} height={70}></Image>
                  </div>
                  <div>
                      <h1 className="text-base">{props.title}</h1>{/* <h1>{job.job_title}</h1> */}
                      <h3 className="text-sm">{props.company}</h3>
                      <h3>$60k to $120k</h3>
                  </div>
                  <div>
                      <h1>Remote from <i>{props.country}</i></h1>
                  </div>
                  <div className="flex flex-col">
                      {props.tags.map(tag => {
                          return <h1 className="bg-remotify-lb text-xs m-1" key={tag.id}>{tag.name + " "}</h1>
                      })}
                  </div>
              </div>
              </CardBody >
            </Card>
    </Link>
               
  )
}
