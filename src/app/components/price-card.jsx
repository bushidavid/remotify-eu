import React from 'react'

export default function PriceCard({ title, description, price }) {
  return (
    <div className='col-start-4 flex flex-col h-[412px] w-[260px] border border-1 border-slate-300 rounded-xl px-4 py-4 mx-4'>
        <h1 className='py-2 font-bold text-2xl'>{title}</h1>
        <h1>{description}</h1>
            <ul className='py-4'>
                <li>Only one Job post</li>
                <li>3</li>
            </ul>
        <h2>{price}</h2>
    </div>
  )
}
