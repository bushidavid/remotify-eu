import FormEditJob from '@/app/components/form-edit-job';
import { getJobDetails } from '@/app/actions/actions'

export default async function Page({ params }) {


    const id = params.jobId;

    const job = await getJobDetails(id)


  return (
    <FormEditJob job={job} />
  )
}
