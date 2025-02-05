import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export default function CandidateCard() {
  return (
    <div className='w-full flex flex-row h-80 items-center justify-around gap-x-4'>
       <div className='grid grid-cols-2 grid-rows-3 gap-x-10 gap-y-4 w-7/12'>
            <div className='row-start-1 row-span-1 col-start-1 col-span-1'>
                <Label className="text-xs font-extralight" htmlFor="name">Name</Label>
                <Input id="name" type="text" className="font-light bg-slate-50" value=""></Input>
            </div>
            <div className="row-start-1 row-span-1 col-start-2 col-span-1">
                <Label className="text-xs font-extralight" htmlFor="lastName">Last Name*</Label>
                <Input id="lastName" type="text" className="font-light bg-slate-50" value=""></Input>
            </div>
            <div className='row-start-2 row-span-1 col-start-1 col-span-1'>
                <Label className="text-xs font-extralight" htmlFor="email">Email*</Label>
                <Input id="email" type="text" className="font-light bg-slate-50" placeholder="example@email.com"></Input>
            </div>
            <div className='row-start-2 row-span-1 col-start-2 col-span-1'>
                <Label className="text-xs font-extralight" htmlFor="phone">Phone</Label>
                <Input id="phone" type="text" className="font-light bg-slate-50" value="" placeholder="123456789"></Input>
            </div>
            <div className='row-start-3 row-span-2 col-start-1 col-span-2'>
                <Label className="text-xs font-extralight" htmlFor="profile">Profile*</Label>
                <Input id="profile" type="textarea" className="font-light bg-slate-50" placeholder="Description"></Input>
            </div>
            
       </div>
       <div className='flex items-center justify-center w-5/12'>
            <div className='w-6/12 flex flex-col items-center justify-center space-y-4 bg-blue-50 p-4 rounded-md'>
                <Image src={"/Logo.png"} className="rounded-full" width={150} height={150} alt='profile_picture'></Image>
                <p className='font-bold'>David Bushi</p>
                <p className="underline">Edit my picture</p>
            </div> 
       </div>
    </div>
  )
}
