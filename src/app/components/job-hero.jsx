import React from 'react'

export default function JobHero({job}) {

  console.log(job);
  
  return (
    <div className='border-b-1 pb-3 border-slate-300'>
        <div className='flex items-center flex-col text-center'>
              <h1 className='text-4xl'>{job?.title}</h1>
              <h2 className='px-3 text-lg'>Remotify Europe</h2>
            <div className='flex mt-4'>
              {job.expiration_date && <h2 className='px-3 md:border-r-1 border-slate-300'>Apply until: {job?.expiration_date}</h2>}
              <p className='px-3 md:border-r-1 border-slate-300'>Remote From {job.country.name}</p>
              <p className='px-3'>#{job.department.name}</p>
            </div>
        </div>
    </div>
  )
}
