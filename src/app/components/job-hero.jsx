import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faBriefcase, faPersonCane } from '@fortawesome/free-solid-svg-icons';

export default function JobHero({job, postedDate}) {
  
  return (
    <div className='border-b-1 pb-3 border-slate-300 w-full'>
        <div className='flex items-center flex-col text-center'>
              <h1 className='text-4xl'>{job?.job_title}</h1>
              <h2 className='px-3 text-lg'>Remotify Europe</h2>
            <div className='flex mt-4'>
              {/*<h2 className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faCalendarDays} /> 31/12/2023 {job?.expiration_date}</h2> */}
              <h2 className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faCalendarDays} />{postedDate}</h2>
              <p className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faLocationDot} /> {job.worldwide ? 'Anywhere' : job.countries}</p>
              <p className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faPersonCane} />{job.experience}</p>
              <p className='px-3'> <FontAwesomeIcon icon={faBriefcase} />{job.category}</p>
            </div>
        </div>
    </div>
  )
}
