import React from 'react'
import CandidateCard from './candidate-card'
import { Separator } from '@/components/ui/separator'

export default function AboutMe() {
  return (
    <div className='w-8/12 mt-10 mb-14 border-b-slate-200'>
        <h2 className='text-xl'>Personal Information</h2>
        <Separator />
        <CandidateCard />
    </div>
  )
}
