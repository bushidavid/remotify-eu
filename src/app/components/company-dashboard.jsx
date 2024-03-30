'use client';

import StatsTile from "./stats-tile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import InfiniteScrollJobsCompany from "./job-scroll";


export default function CompanyDashboard({ companyJobs, companyId}) {

  const { data: session, status } = useSession({
    onUnauthenticated(){
      redirect('/')
    }
  })

  return (
    <>
      {session && 
        <div className="flex flex-col w-full">
          <div className="px-10 flex flex-row gap-5" >
            <div className="w-full flex flex-row gap-5 justify-between">
                <StatsTile title={"stat title"} stat={7}/>
                <StatsTile title={"stat title"} stat={7}/>
                <StatsTile title={"stat title"} stat={7}/>
                <StatsTile title={"stat title"} stat={7}/>
                <StatsTile title={"stat title"} stat={7}/>
                <StatsTile title={"stat title"} stat={7}/>
            </div>
            <div>
                
            </div>
          </div>
          <InfiniteScrollJobsCompany initialJobs={companyJobs} />
        </div>
      }
    </>
  )
}
