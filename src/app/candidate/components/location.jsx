import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function Location() {
  return (
    <div className='w-8/12 mb-14 border-b-slate-200 h-fit px-2'>
        <h2 className='text-xl py-2'>Location</h2>
        <Separator />
        <div className='w-60 my-4'>
            <Label className="text-xs font-extralight" htmlFor="location">Where do you live?*</Label>
            <Input id="location" type="text" className="font-light bg-slate-50" value="Italy"></Input>
        </div>
    </div>
  )
}
