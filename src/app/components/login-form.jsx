"use client";

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const FormSchema = z.object({
  email: z.string().email({
        message: "Please enter a valid email address.",
        }),
    password: z.string().min(4, {
        message: "Password is required.",
        }), 
})
  
export default function LoginForm() {

    const isFirstRender = useRef(true);

    const {data: session, status} = useSession();
    const router = useRouter();

    const searchParams = useSearchParams()
  
    const search = searchParams.get('callbackUrl');

    const index = search?.indexOf("plan=")

    const plan = index == -1 ? 0 : search?.slice(index + 5);
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });    
      
    const onSubmit = async (data) => {

      signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl,
      });

    }

    useEffect(() => {

      if(isFirstRender.current || status !== 'authenticated') {
        isFirstRender.current = false;
        return;
      }

      if(plan != 0){
        const stripeCheckout = async() => {


          const res = await fetch('api/subscribe-payment', {
            method: 'POST',
              headers: {
                  'ContentType': 'application/json'
              },
              body: JSON.stringify({
                priceId: [plan],
                email: session?.user?.email
              })
          })

          const response = await res.json();

          router.push(response.url)

        }

        stripeCheckout();
      }else {
        router.push(callbackUrl); // redirect to callbackUrl if no plan
      }

    }, [status, session, plan, router, callbackUrl])
  

        


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-8/12 space-y-6">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
);
}

// export default function CandidateRegisterForm() {

//     const router = useRouter();

//     const [signInForm, setSignInForm] = useState({
//         email: "",
//         password: "",
//         name: "",
//         role: "admin"
//     })

//     const handleChange = (e) => {
//       setSignInForm({
//         ...signInForm,
//         [e.target.name] : e.target.value
//       })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch('api/register', {
//             method: 'POST',
//             headers: {
//                 'ContentType': 'application/json'
//             },
//             body: JSON.stringify({signInForm})
//         })

//         const userInfo = await response.json();

//         console.log(userInfo);

//         router.push('/company-signin')
//     }


//   return (
//     <>
//         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Create a company Page
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
//             <div>
//                 <Input type="text" variant="underlined" label="Your Company Name" isRequired name="name" onChange={(e) => handleChange(e)}></Input>
//             </div>
//             <div>
//                 <Input type="email" variant="underlined" label="Your Email" isRequired name="email" placeholder="email@example.com" onChange={(e) => handleChange(e)}></Input>
//               </div>
//             <div>
//               <div className="flex items-center justify-between">
//                 <Input type="password" variant="underlined" label="Password" isRequired name="password" onChange={(e) => handleChange(e)}></Input>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>

          
//         </div>
//       </div>
//     </>
//   )
// }


