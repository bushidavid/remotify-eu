import React from 'react'

export default function JobDetails({ job }) {

  const description = { __html: job.job_description };
  const companyDescription = { __html: job.company_description};

  return (
    <>
      <div className='prose flex flex-col mt-4' dangerouslySetInnerHTML={companyDescription}>

      </div>

      <div className='prose flex flex-col mt-4' dangerouslySetInnerHTML={description}>

      </div>
    </>
  )
}
