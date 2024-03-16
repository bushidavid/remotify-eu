import { MdLocationPin, MdCalendarMonth } from "react-icons/md";
import { FaPersonCane } from "react-icons/fa6";
import { IoMdBriefcase } from "react-icons/io";

export default function JobHero({job, postedDate}) {
  
  return (
    <div className='border-b-1 pb-3 border-slate-300 w-full'>
        <div className='flex items-center justify-center  flex-col'>
              <h1 className='text-4xl'>{job?.job_title}</h1>
              <h2 className='px-3 text-lg'>Remotify Europe</h2>
            <div className='flex items-center justify-center mt-4 gap-1'>
              {/*<h2 className='px-3 md:border-r-1 border-slate-300'><FontAwesomeIcon icon={faCalendarDays} /> 31/12/2023 {job?.expiration_date}</h2> */}
              <MdCalendarMonth /><h2 className='px-1 md:border-r-1 border-slate-300'>{postedDate}</h2>
              <MdLocationPin /><p className='px-1 md:border-r-1 border-slate-300'> {job.worldwide ? 'Anywhere' : job.country_names}</p>
              <FaPersonCane /><p className='px-1 md:border-r-1 border-slate-300'>{job.exp_names + 'seniority'}  </p>
              <IoMdBriefcase /><p className='px-1'>{job.category}</p>
            </div>
        </div>
    </div>
  )
}
