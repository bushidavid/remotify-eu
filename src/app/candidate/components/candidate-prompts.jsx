"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const FormSchema = z.object({
    message: z.string().min(1, {
        message: "Message is required.",
        }), 
    // surname: z.string().min(1, {
    //     message: "Surname is required.",
    //     }), 
    // email: z.string().email({
    //     message: "Please enter a valid email address.",
    //     }),
    // password: z.string().min(4, {
    //     message: "Password is required.",
    //     }), 
    // confirmPassword: z.string().min(4, {
    //     message: "Please enter a valid password",
    //     }),
    // userType: z.enum(["candidate", "company"], {
    //     required_error: "User type is required." 
    //     }),
 })
//.superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//       ctx.addIssue({
//         code: "custom",
//         message: "The passwords did not match.",
//         path: ['confirmPassword']
//       });
//     }
//   });
  
export default function CandidatePrompt() {

    const [ displayErrorMessage, setDisplayErrorMessage ] = useState(false);
    const [ displaySuccessMessage, setDisplaySuccessMessage ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ openaiReply, setOpenaiReply ] = useState(false);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    });

    

    const handleSubmit = async (data) => {
        
        const result = await fetch('/api/openai', {
            method: 'POST',
            body: JSON.stringify({'message' : data.message }),
            headers: {
                "content-type": "application/json",
            },
        })
        

        //create new user with supabase auth
        const response = await result.json();

        console.log("OpenAI response: ", response);

        setOpenaiReply(response.message);

        setLoading(false);

        return response;
        
    }

    const onSubmit = async (data) => {

        setLoading(true);
        // toast({
        // title: "You submitted the following values:",
        // description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        // ),
        // });

        const result = await handleSubmit(data);

        console.log("logging result from front end: ", result);

        if(!result){
            setDisplayErrorMessage(true);
            setLoading(false);
        }else{
            setDisplaySuccessMessage(true);
        }

    };

    useEffect(() => {
        const subscription = form.watch(() => setDisplayErrorMessage(false));
        return () => subscription.unsubscribe();
      }, [form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-8/12 space-y-6">
                    {/* Role Selection */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Input your prompt</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex flex-col items-center justify-center">
                        {displayErrorMessage && <p className="text-red-700">Error sending prompt</p>}
                        {displaySuccessMessage && <p className="text-green-700">Prompt Successful. Awaiting response...</p>}
                        <Button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>

            
    
        </>
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


