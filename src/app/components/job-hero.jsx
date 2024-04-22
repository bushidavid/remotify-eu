import { MdLocationPin, MdCalendarMonth } from "react-icons/md";
import { FaPersonCane } from "react-icons/fa6";
import { IoMdBriefcase } from "react-icons/io";

export default function JobHero({job, postedDate}) {
  
  return (
    <div className='border-b-1 pb-3 border-slate-100 w-full'>
        <div className='flex items-center justify-center flex-col'>
              <h1 className='text-center text-4xl'>{job?.job_title}</h1>
              <h2 className='px-3 text-md'>Remotify Europe</h2>
            <div className='flex items-center justify-center mt-4 gap-x-3 flex-wrap text-sm'>
              {/*<h2 className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faCalendarDays} /> 31/12/2023 {job?.expiration_date}</h2> */}
              <div className="flex flex-row items-center"><MdCalendarMonth /><h2 className='px-1 md:border-r-1 border-slate-300'>{postedDate}</h2></div>
              
              <div className="flex flex-row items-center"><MdLocationPin /><p className='px-1 md:border-r-1 border-slate-300'> {job.worldwide ? 'Anywhere' : job.country_names}</p></div>
              <div className="flex flex-row items-center"><FaPersonCane /><p className='px-1 md:border-r-1 border-slate-300'>{job.experience}  </p></div>
              <div className="flex flex-row items-center"><IoMdBriefcase /><p className='px-1'>{job.category}</p></div>
            </div>
        </div>
    </div>
  )
}