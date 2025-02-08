import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Availability() {
  return (
    <div className='w-8/12 mb-14 border-b-slate-200 h-fit px-2'>
        <h2 className='text-xl py-2'>Availability</h2>
        <Separator />
        <div className='flex flex-row gap-x-6 space-x-2 my-4'>
            <div className='space-x-2 flex items-center'>
                <Checkbox id="immediately" type="text" className="font-light bg-slate-50" value="bushidavid@gmail.com"></Checkbox>
                <Label className="text-xs font-extralight" htmlFor="immediately">Immediately</Label>
            </div>
            <div className='space-x-2 flex items-center'>
                <Checkbox id="months" type="text" className="font-light bg-slate-50" value="bushidavid@gmail.com"></Checkbox>
                <Label className="text-xs font-extralight" htmlFor="months">In 1 or 2 months</Label>
            </div>
            <div className='space-x-2 flex items-center'>
                <Checkbox id="looking" type="text" className="font-light bg-slate-50" value="bushidavid@gmail.com"></Checkbox>
                <Label className="text-xs font-extralight" htmlFor="looking">I&apos;m just curious</Label>
            </div>
        </div>
    </div>
  )
}
