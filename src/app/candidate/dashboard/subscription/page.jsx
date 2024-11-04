import CandidateSubscription from '@/app/components/candidate-subscription'
import React from 'react'
import { getServerSession } from 'next-auth'
import { Options } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {

  const session = await getServerSession(Options);

  const subscription = await getSubscription(session?.user?.id || null);

  return (
    <>
      {subscription ? 
        (
          <CandidateSubscription session={session} subscription={subscription} />
        ) :
        (
          <div><h1>You don&apos;t have any active subscription</h1></div>
        )
      }
    </>
  )
}

const getSubscription = async (userId) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-subscription`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({internalCustomerId: userId})
    })

    const subscription = await response.json();
    const subscriptionId = subscription.subscriptions.data[0].id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-subscription-name`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({subscriptionId: subscriptionId})
    })

    const productName = await res.json();

    return {
      subscription,
      name: productName.name
    }
}
