import React from 'react'

export default function SubscriptionStats({ number, description }) {
  return (
    <div className='text-white flex flex-col items-center gap-2'>
        <h1 className='text-6xl font-bold'>{number}</h1>
        <h1 className='text-xl font-regular'>{description}</h1>
    </div>
  )
}
