'use client'

import { useRouter } from 'next/navigation'
import { updateApplyClicks } from '../actions/actions'

import React from 'react'

export default function ApplyButton({ url, jobId }) {
    
    const router = useRouter();

    const handleApplyClick = async () => {

        const res = await updateApplyClicks(jobId);

        console.log(res);

        router.push(url);
    }

  return (
    <div>
        <button onClick={handleApplyClick} className='px-6 rounded-md py-2 bg-remotify-db text-white'>Apply</button>
    </div>
  )
}
