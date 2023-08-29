import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

export default function Job({ ...props }) {
  
  return (
  
    <Link href={`/job/${props.id}`}>
      <div className="grid grid-cols-4 grid-rows-1 border-1 border-gray-300 my-1 w-full max-w-4xl p-5 items-center h-28">
          <div className="w-24">
              <Image className="rounded-full" src={'/logo.jpg'} width={70} height={70}></Image>
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
    </Link>
               
  )
}
