import CompanyDashboard from "@/app/components/company-dashboard";
import JobList from "@/app/components/job-list";
import SidebarNav from "@/app/components/sidebar-nav";
import Image from "next/image";
import CompanyImage from "@/app/components/company-image";
import { getCompanyJobs, getCompanyStats } from "@/app/actions/actions";
import { getServerSession } from "next-auth";
import { Options } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Page() {

  const session = await getServerSession(Options);

  console.log(session);

  if(!session){
    redirect('/signin?callbackUrl=/company/dashboard');
  }

  const companyJobs = await getCompanyJobs(undefined, undefined, session.user.id);
  const companyStats = await getCompanyStats(session.user.id);

  
  return (
    <> 
          <section className="grid grid-cols-12 grid-rows-12 w-11/12 my-10 gap-3">
            
            <section className="col-start-2 col-span-10 row-start-1 row-span-full gap-5">
              <CompanyDashboard companyJobs={companyJobs} companyId={session.user.id} companyStats={companyStats}/>
            {/* Job List with jobs posted by the company */}
            </section>
          </section>
    </>
  )
}
