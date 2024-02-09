
import CompanyDashboard from "@/app/components/company-dashboard";
import JobList from "../../components/job-list";
import SidebarNav from "@/app/components/sidebar-nav";



export default function Page() {
  return (
    <>
      <section className="grid grid-cols-12 grid-rows-12 w-11/12 my-10">
        <h1 className="col-span-2">Company Name Here</h1>
        <section className="col-span-2 row-start-2 row-span-full border-r-1 border-slate-200">
            <SidebarNav className="" />
        </section>
        
        <section className="col-start-3 col-span-full row-span-full">
          <CompanyDashboard />
        {/* Job List with jobs posted by the company */}
        </section>
      </section>

    </>
  )
}
