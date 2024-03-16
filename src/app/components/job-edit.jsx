import Link from 'next/link'
import Image from 'next/image';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";


export default function JobEdit({ ...props }) {

  const date = new Date(props.created_at);
  const today = new Date(Date.now());

  const todayFormatted = today.toLocaleString('lu-LU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const formattedDate = date.toLocaleString('lu-LU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
 

  return (

    <div>
      <Link className="relative flex flex-row items-center mb-4" href={`/company/${props.companyId}/editjob/${props.id}`}>
        {(formattedDate === todayFormatted) && <div className={`absolute -left-6 -top-4 z-50 bg-[#F72E9D] text-[#A0F4BC] text-lg font-bold rounded-full p-2`}>new</div>}
              <Card className={`sm:w-full w-96 hover:bg-remotify-lum `}> {/* ${props.featured ? 'bg-[#f7f1de]' : '' } */}
                <CardBody className='flex flex-col items-center justify-between'>
                  <div className='flex md:flex-row flex-col justify-start items-center w-full pb-2'>
                    <div className="w-[8%] max-w-[8%]">
                        <Image className="rounded-full" src={props.jobLogoUrl ? props.jobLogoUrl : "/Logo.jpg"} alt="company_logo" width={70} height={70}></Image>
                    </div>
                    <div className='w-[40%] max-w-[40%]'>
                        <h1 className="text-base">{props.title}</h1>{/* <h1>{job.job_title}</h1> */}
                        <h2 className="text-sm">{props.companyName}</h2>
                        <h3 className='text-sm'>{props.salaryMin +" to " + props.salaryMax + ' ' + props.currency}</h3>
                    </div>
                    <div className='min-w-[30%] max-w-[30%]'>
                        <h1 className=''> {props.worldwide ? "Worlwide" : `Remote from ${props.country}`}</h1>
                    </div>
                    <div className="flex flex-row flex-wrap w-[22%] max-w-[22%]">
                        {props.tags.split(',').map(tag => (
                          <p className={`border-1 border-remotify-db rounded-md text-[14px] font-medium m-1 p-1`} key={tag}>{tag}</p>
                        ))}
                    </div>
                    
                  </div>
                  <div className=' pt-1 mt-2 mr-auto'>
                    <p className='text-xs font-extralight'>Posted {(formattedDate === todayFormatted) ? "today" : formattedDate}</p>
                  </div>
                </CardBody >
              </Card>
          <div className={`absolute -right-12 rotate-90 bg-[#A0F4BC] text-[#F72E9D] font-bold text-lg rounded-md p-2 ${!props.featured ? "hidden" : ""}`}>featured</div>
      </Link>
    </div>   
  )
}
