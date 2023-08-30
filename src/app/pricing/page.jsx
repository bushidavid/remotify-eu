import React from 'react'
import PriceCard from '../components/price-card'

export default function Page() {
  return (
    <div className='flex flex-col  items-center justify-center mt-10 '>
      <h1 className='text-4xl'>The Right Plan for Your Business</h1>
      <p className='text-center'>We have several powerful plans to showcase your business and get You in front of thousands of Candidates. <br/> Everything you need.</p>
      <div className='flex flex-row my-6'>
        <p className='px-4'>Bill Monthly</p>
        <button>change</button>
        <p className='px-4'>Bill Annualy</p>
      </div>
      
      <div className='flex flex-row'>
        <PriceCard title="Just One" description="Buy only one job post" price="$29.99" />
        <PriceCard title="3 x One" description="Buy 3 job posts and get one free"  price="$69.99" />
        <PriceCard title="Subscription" description="Base subscription model" price="$149.99" />
        <PriceCard title="Custom" description="Contact us to get a quote"  price="Get a Quote" />
      </div>

    </div>
  )
}
