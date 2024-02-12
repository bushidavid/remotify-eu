
'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CompanyDashboard from "@/app/components/company-dashboard";
import JobList from "../../components/job-list";
import SidebarNav from "@/app/components/sidebar-nav";
import Image from "next/image";
import CompanyImage from "@/app/components/company-image";



export default function Page() {

  const { data: session, status } = useSession({
    onUnauthenticated(){
      redirect('/api/auth/signin');
    }
  })

  console.log(session);

  return (
    <>
      {session && 
          <section className="grid grid-cols-12 grid-rows-12 w-11/12 my-10 gap-3">
            <div className="flex flex-row col-span-2 items-center gap-5 ">
                <CompanyImage profImage={session.user.image} name={session.user.name} />
                <h1 className="col-span-2">{session.user.name}</h1>
            </div>
            <section className="col-span-2 row-start-2 row-span-full border-r-1 border-slate-200">
                <SidebarNav className="" />
            </section>
            
            <section className="col-start-3 col-span-full row-span-full gap-5">
              <CompanyDashboard />
            {/* Job List with jobs posted by the company */}
            </section>
          </section>
      }

    </>
  )
}
