'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CompanyDashboard from "@/app/components/company-dashboard";
import JobList from "@/app/components/job-list";
import SidebarNav from "@/app/components/sidebar-nav";
import Image from "next/image";
import CompanyImage from "@/app/components/company-image";



export default function Page() {

  const { data: session, status } = useSession({
    onUnauthenticated(){
      redirect('/')
    }
  })

  
  return (
    <>
      {session && 
          <section className="grid grid-cols-12 grid-rows-12 w-11/12 my-10 gap-3">
            
            <section className="col-start-2 col-span-10 row-start-1 row-span-full gap-5">
              <CompanyDashboard />
            {/* Job List with jobs posted by the company */}
            </section>
          </section>
      }
    </>
  )
}
