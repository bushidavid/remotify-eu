import { useRouter } from "next/navigation"



function CompanyJobs({ jobs }) {

    const handleDelete = async () => {
        const response = await fetch('/api/delete-job', {
            method: 'DELETE',
            headers: {   
                    ContentType: 'application/json',
                },
            body: JSON.stringify({id: job.id})
        })

        const res = await response.json();

        console.log(res);

        router.push(`/company/${job.companyId}/dashboard`)
    }

    const router = useRouter();

    return (
        <>
        <h1 className="text-center text-4xl mt-4">Active Jobs</h1>
        <ul role="list" className="divide-y divide-gray-100">
        {jobs.map((job) => (
            <li key={job.id} className="flex justify-between items-center gap-x-6 py-5">
                <div className="flex flex-col min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{job.job_title}</p>
                    </div>
                    <div className="sm:flex">
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Posted 12 Apr 2024
                        </p>
                    </div>
                </div>


                <div class="inline-flex h-8 rounded-md shadow-sm " role="group">
                <button onClick={() => router.push(`dashboard/viewjob/${job.id}/`)} type="button" class="px-4 py-0.5 text-xs text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 ">
                        View
                    </button>
                    <button onClick={() => router.push(`editjob/${job.id}/`)} type="button" class="px-4 py-0.5 text-xs text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700  ">
                        Edit
                    </button>
                    <button type="button" class="px-4 py-0.5 text-xs text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700  ">
                        Close
                    </button>
                    <button onClick={handleDelete} type="button" class="px-4 py-0.5 text-xs text-red-800 bg-red-200  rounded-e-lg hover:bg-red-300 hover:text-red-900   ">
                        Delete
                    </button>
                </div>
            </li>
        ))}
        </ul>
        </>
    )
}

export default CompanyJobs