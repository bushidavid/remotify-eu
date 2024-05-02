import React from 'react'

export default function JobDetails({ job }) {

  const description = { __html: job.job_description };
  const companyDescription = { __html: job.company_description};

  return (
    <section className='w-[100%] min-h-screen'>
      <div className='prose prose-base prose-h1:mt-3 prose-h2:mt-3 prose-h3:mt-3 prose-h1:mb-2 prose-h2:mb-2 prose-h3:mb-2 prose-ul:my-2 prose-li:my-1.5 prose-p:my-1.5 flex flex-col mt-4 max-w-none' dangerouslySetInnerHTML={companyDescription}>

      </div>

      <div className='prose prose-base prose-h1:mt-3 prose-h2:mt-3 prose-h3:mt-3 prose-h1:mb-2 prose-h2:mb-2 prose-h3:mb-2 prose-ul:my-2 prose-li:my-1.5 prose-p:my-1.5 flex flex-col max-w-none ' dangerouslySetInnerHTML={description}>

      </div>
    </section>
  )
}