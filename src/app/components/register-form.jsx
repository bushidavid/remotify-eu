"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    name: z.string().min(1, {
        message: "Name is required.",
        }), 
    surname: z.string().min(1, {
        message: "Surname is required.",
        }), 
    email: z.string().email({
        message: "Please enter a valid email address.",
        }),
    password: z.string().min(4, {
        message: "Password is required.",
        }), 
    confirmPassword: z.string().min(4, {
        message: "Please enter a valid password",
        }),
    userType: z.string().min(1, {
        message: "Name is required.",
        }), 
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ['confirmPassword']
      });
    }
  });
  
export default function RegisterForm() {

    const [userType, setUserType] = useState("candidate");

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: "candidate",
        },
    });

    const onSubmit = async (data) => {
        // toast({
        // title: "You submitted the following values:",
        // description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        // ),
        // });

        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'ContentType': 'application/json'
            },
            body: JSON.stringify({data})
        })

        const userInfo = await response.json();

        // router.push('/candidate-signin')
        
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-8/12 space-y-6">
                <div className='flex flex-row gap-x-1 w-full'>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Surname</FormLabel>
                            <FormControl>
                                <Input placeholder="Surname" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                />
                </div>
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
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* <FormField
                control={form.control}
                className='invisible'
                name="userType"
                render={({ field }) => (
                    <FormItem >
                    <FormLabel>User Type</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your User Type
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                /> */}
                {/* Role Selection */}
                <div className="flex items-center space-x-4">
                <Checkbox
                    checked={userType === "candidate"}
                    onCheckedChange={() => setUserType("candidate")}
                    id="candidate-checkbox"
                />
                <label htmlFor="candidate-checkbox" className="text-sm font-medium">
                    Sign up as Candidate
                </label>
                
                <Checkbox
                    checked={userType === "company"}
                    onCheckedChange={() => setUserType("company")}
                    id="company-checkbox"
                />
                <label htmlFor="company-checkbox" className="text-sm font-medium">
                    Sign up as Company
                </label>
                </div>

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


