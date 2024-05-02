'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@nextui-org/react';
import { useContext } from 'react';
import { FilterContext } from '../context/store';
import { Transition } from '@headlessui/react'

export default function Example() {

  const context = useContext(FilterContext);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);
  const didMount = useRef(false);

  const cancelButtonRef = useRef(null)


  const handleSubmit = async (e) => {

    e.preventDefault();

   localStorage.setItem("seenPopUp", true)
    
    const result = await fetch('/api/subscribe', {
        method: 'PUT',
        body: JSON.stringify({'email' : email }),
        headers: {
            "content-type": "application/json",
          },
    })

    let res = await result.json();

    if(res.ok){
        setSubscribed(true);
    }else{
        setError(true);
    }
    
  }

  useEffect(() => {

    let returningUser = localStorage.getItem("seenPopUp");

    if (didMount.current){
        setTimeout(() => context.setOpenPopUp(false), 5000);
    }
    else {
        if(!returningUser){
            setTimeout(() => context.setOpenPopUp(true), 3000);
            didMount.current = true
        }
    };
}, [subscribed]);

  return (
    context.openPopUp && 
        (!subscribed ? (
            <form onSubmit={e => handleSubmit(e)}>
                <div
                className="relative z-10 animate-jump-in animate-once animate-duration-[1000ms] animate-ease-inv"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
                >
                {/*
                    Background backdrop, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
                    Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
                */}
                <Transition
                    show={context.openPopUp}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/*
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                */}
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                            </div>
                            
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3
                                    className="text-base font-semibold leading-6 text-gray-900"
                                    id="modal-title"
                                >
                                    Subscribe to Our Free Newsletter
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                    Get weekly remote jobs straight to your inbox
                                    </p>
                                </div>
                                <Input type='email' value={email} placeholder='you@email.com' variant="underlined" label="email" className='my-2' onChange={(e) => setEmail(e.target.value)} />
                                {error && <p className='text-red-600 text-sm'>Error! Please try again or contact support at: support@remotifyeurope.com</p>}
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                        >
                            Subscribe
                        </button>
                        <button
                            onClick={(e) => {

                                e.preventDefault();

                                try {
                                    localStorage.setItem("seenPopUp", true); console.log(localStorage.getItem("seenPopUp")); context.setOpenPopUp(prev => !prev);
                                } catch (error) {
                                    console.error("Error setting item in Local Storage:", error);
                                }
                                }
                            }
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </Transition>
                </div>
            </form>
        ): (
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
                >
                {/*
                    Background backdrop, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
                    Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
                */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/*
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                */}
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                            </div>
                            
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3
                                    className="text-base font-semibold leading-6 text-green-700"
                                    id="modal-title"
                                >
                                    Thank you For Subscribing!
                                </h3>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            disabled={subscribed}
                            type="submit"
                            className="disabled:opacity-60 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                        >
                            Subscribe
                        </button>
                        <button
                            onClick={(e) => {

                                e.preventDefault();

                                try {
                                    localStorage.setItem("seenPopUp", true); console.log(localStorage.getItem("seenPopUp")); context.setOpenPopUp(prev => !prev);
                                } catch (error) {
                                    console.error("Error setting item in Local Storage:", error);
                                }
                                }
                            }
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Close
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    )
  )
}
