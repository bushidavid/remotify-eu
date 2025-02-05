"use client";

const fromTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    // Format the date as "DD MMM YYYY"
    const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    });

    return formattedDate;
}

export default function CandidateSubscription({ user, subscription }) {

    const plan = subscription?.subscription?.subscriptions?.data[0] || null;

    const handleCancelSubscription = async () => {

        const response = await fetch('/api/cancel-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: plan.id,
            })
        })
    }

    const handleUpdateSubscription = async (priceId) => {
        const response = await fetch('/api/update-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPriceId: priceId,
                customerId: plan.customer
            })
        })
    }

    return (
      <>
          
          
        { plan ? 
          (<div className='flex flex-col w-full justify-center items-center my-10'>
              <div className='flex flex-row w-8/12 max-w-7xl flex-grow justify-between items-center border-b-1 border-gray-200 pb-2'>
                <div><h1 className='text-2xl'>Subscription Details</h1></div>
              
              </div>
              <div className='flex flex-col w-10/12 max-w-7xl h-full text-sm gap-y-4 justify-center items-center pt-4'>
                <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                </div>
                <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                  <div className='w-[50%]'>Subscription Plan</div>
                  <div className='w-[50%]'>
                  {subscription.name} <span className='rounded-lg bg-green-300 text-green-800 py-1 px-2'>{plan.status}</span>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                  <div className='w-[50%]'>Price</div>
                  <div className='w-[50%]'>{"€" + plan.plan.amount / 100 + " per " + plan.plan.interval}</div>
                </div>
                <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                  <div className='w-[50%]'>Start Date</div>
                  <div className='w-[50%]'>{fromTimestampToDate(plan.current_period_start)}</div>
                </div>
                <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                  <div className='w-[50%]'>Next Billing Date</div>
                  <div className='w-[50%]'>{fromTimestampToDate(plan.current_period_end)}</div>
                </div>
                <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                  <div className='w-[50%]'>Renewal Date</div>
                  <div className='w-[50%]'></div>
                </div>
              </div>

              <div className='w-8/12 mas-w-7-xl flex items-stretch justify-between gap-x-2 pt-6 mt-4  border-t-1'>
              <div className='flex flex-row gap-x-1'>
                <button onClick={() => handleUpdateSubscription('price_1QEBZLG3AO8aAsLx70IHMyLb')} className='px-6 py-2 border-1 border-slate-200 shadow-md hover:shadow-lg rounded-lg bg-green-400 text-green-900'>Upgrade to Quarterly</button>
                <button onClick={() => handleUpdateSubscription('price_1QEBabG3AO8aAsLx5qJ9lKJC')} className='px-6 py-2 border-1 border-slate-200 shadow-md hover:shadow-lg rounded-lg bg-green-400 text-green-900'>Upgrade to Yearly</button>
            </div>
                <button onClick={handleCancelSubscription} className='px-6 py-2 border-1 border-slate-200 shadow-md hover:shadow-lg rounded-lg text-slate-400'>Cancel Subscription</button>
              </div>

          </div>) : (

            <div>You currently don&apos;t have any active subscriptions</div>

          )


        }
          
        </>
    )
}
