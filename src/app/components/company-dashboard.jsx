'use client';

import StatsTile from "./stats-tile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import InfiniteScrollJobsCompany from "./infinite-scroll-jobs-company";
import CompanyJobs from "./company-jobs";
import Link from "next/link";


export default function CompanyDashboard({ companyJobs, companyId, companyStats}) {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/signin')
    }
  })

  return (
    <>
      {session && 
        <div className="flex flex-col w-full">
          <div className=" w-full flex flex-row" >
            <div className="w-full flex flex-row gap-2 justify-between">
                <StatsTile title={"Total Impressions"} stat={companyStats.total_views}/>
                <StatsTile title={"Total Clicks"} stat={companyStats.total_clicks}/>
                <StatsTile title={"Click-Through Rate"} stat={(companyStats.total_views / companyStats.total_clicks).toFixed(2)}/>
                <StatsTile title={"Impressions Last 24h"} stat={98}/>
                <StatsTile title={"Impressions Last 7 Days"} stat={295}/>
                <StatsTile title={"Clicks on Apply"} stat={7}/>
            </div>
            <div>
                
            </div>
          </div>
          <CompanyJobs jobs={companyJobs} />
          <div className="flex flex-grow justify-end"><Link href={'/alljobs'} className="text-sm hover:underline">View All Jobs {'->'}</Link></div>
        </div>
      }
    </>
  )
}
