import FormEditJob from '@/app/components/form-edit-job'
import { getJobDetails } from '@/app/actions/actions'

export default async function Page({ params }) {

    console.log("printing params \n", params);

    const id = params.jobId;

    const job = await getJobDetails(id)

    console.log("inside job edit component \n", job)

  return (
    <FormEditJob job={job} />
  )
}
