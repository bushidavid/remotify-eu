import React from 'react'

export default function StatsTile({title, stat}) {
  return (

        <div className='flex flex-col w-2/12 border border-slate-200 rounded-md text-6xl text-slate-500'>
            <h1 className='text-sm'>{title}</h1>
            <h2 className='text-center'>{stat}</h2>
        </div>

  )
}
