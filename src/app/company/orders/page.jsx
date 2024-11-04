import React from 'react';
import { Options } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getCompanyOrders } from '@/app/actions/actions';
import { DateTime } from 'luxon';

const getPrices = async () => {

  let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products`);
  return res.json();

}

const date = DateTime.now();

const options = {
  year : "numeric",
  month: "short",
  day: "numeric"
}


const getStatusMessage = (status) => {
  switch(status){
    case 1: 
      return (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Paid</span>
                            </span>
                          </td>
      );
    case 2: 
      return (
        <td className="px-5 py-5 border-b bg-white border-gray-200 text-sm">
                            <span
                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Overdue</span>
                            </span>
                          </td>
      );
    case 3: 
      return (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                              className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Pending</span>
                            </span>
                          </td>
      );
    default: 
      return (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span
            className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Unknown Status</span>
          </span>
        </td>
      )
  }
}

export default async function Page() {

  const session = await getServerSession(Options);

  if(!session){
    redirect('/signin?callbackUrl=/company/dashboard');
  }

  const orders = await getCompanyOrders(session.user.id);

  const pricesObject = await getPrices();
  const pricesArray = Object.values(pricesObject);


  return (
    <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
            >
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Issued / Due
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                {orders.map(order => 
                    {
                      const matchingPrice = pricesArray.find(price => price.id === order.stripe_price_id);
                      const start = DateTime.now();
                      const end = DateTime.fromISO(order.created_at).plus({ months: 1 });
                      //console.log(start.toFormat('D'), end.toFormat('D')); // For logging purposes
                      const diff = end.diff(start, ['days']).toObject();
                      const daysUntilDue = Math.floor(diff.days);

                      return (
                        <tr key={order.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {matchingPrice?.nickname}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{(order.amount / 100).toFixed(2).replace(".",",")}<span className="text-gray-600 whitespace-no-wrap ml-1">EUR</span></p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {/* <p className="text-gray-900 whitespace-no-wrap">{new Date(order.created_at).toLocaleString('en-GB', options)}</p> */}
                            <p className="text-gray-900 whitespace-no-wrap">{date.setLocale('en-GB').toLocaleString(options)}</p>
                            <p className="text-gray-600 whitespace-no-wrap">
                              {daysUntilDue > 0 
                                ? `Due in ${daysUntilDue} days` 
                                : daysUntilDue === 0
                                  ? "Due today"
                                  : `Overdue by ${Math.abs(daysUntilDue)} days`}
                            </p>
                          </td>
                          {getStatusMessage(order.status)}
                          {/* <td
                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                          >
                            <button
                              type="button"
                              className="inline-block text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                className="inline-block h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                />
                              </svg>
                            </button>
                          </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
  )
}
