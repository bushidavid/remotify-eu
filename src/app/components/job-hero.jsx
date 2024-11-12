import { MdLocationPin, MdCalendarMonth } from "react-icons/md";
import { FaPersonCane } from "react-icons/fa6";
import { IoMdBriefcase } from "react-icons/io";
import CountryList from "./country-list";

export default function JobHero({job, postedDate}) {

  const today = new Date(Date.now());

  const locale = 'en-US'; // Specify a default
  const todayFormatted = today.toLocaleString(navigator.language || locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  
  return (
    <div className='border-b-1 pb-3 border-slate-100 w-full'>
        <div className='flex items-center justify-center flex-col'>
              <h1 className='text-center text-4xl'>{job?.job_title}</h1>
            <div className='flex items-center justify-center mt-4 gap-x-3 flex-wrap text-sm'>
              {/*<h2 className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faCalendarDays} /> 31/12/2023 {job?.expiration_date}</h2> */}
              <div className="flex flex-row items-center gap-x-1"><MdCalendarMonth /><p className=''>{(postedDate === todayFormatted) ? "Posted today" : `Posted on ${postedDate}`}</p></div>
              
              <div className="flex flex-row items-center">
                <MdLocationPin />
                <CountryList countries={job.countries} />
                
                {/* <p className='px-1 md:border-r-1 border-slate-300'> {job.worldwide ? 'Worldwide' : job.countries}</p> */}
              </div>
              <div className="flex flex-row items-center md:border-l-1 pl-2 gap-x-1"><FaPersonCane /><p className='px-1 md:border-r-1  border-slate-300'>{job.experience}  </p></div>
              <div className="flex flex-row items-center gap-x-1"><IoMdBriefcase /><p className='px-1'>{job.category}</p></div>
            </div>
        </div>
    </div>
  )
}