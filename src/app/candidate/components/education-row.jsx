import React from 'react'

export default function EducationRow() {
  return (
    <div className='w-full flex flex-row py-2 items-start justify-start gap-x-4'>
        <div className='w-4/12 text-right py-1'>
            <h3 className='text-sm text-slate-600 font-light'>September 2021 - June 2024</h3>
        </div>
        {/* Experience Details  */}
        <div className='flex flex-col items-start justify-start gap-x-1 w-8/12 overflow-hidden'>
            <h3 className='text-lg font-semibold'>Masters In Business Administration</h3>
            <h4 className='text-xs text-slate-600'>University of Pisa</h4>
            <p className='my-2 text-sm max-w-full text-slate-600 font-light'>Hello there asdf SADFASDF ASDGSDGF sdfgsdfgh sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfg sdfg sdfgggsddf fgg sdfg gfsdrgfg vfvdsfv </p>
        </div>
    </div>
  )
}
