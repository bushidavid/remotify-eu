'use client';

import React from 'react'
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from 'react';

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
})


export default function Subscribe() {

    const [loading, setLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {

        setLoading(true);
  
        const result = await fetch('/api/subscribe', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
              },
        })
    
        let res = await result.json();
    
        if(res.ok){
            setShowSuccessMsg(true);
        }else{
            setShowErrorMsg(true);
        }
  
      }

    return (
        <> 
            <div className=' hidden lg:flex flex-col w-60 h-fit rounded-xl shadow-xl bg-slate-50 items-stretch border-gray-100 border-2 justify-around sticky top-10'>
                <div className='lg:flex flex-col p-4 pb-0'>
                    <div className='flex flex-row items-center justify-around'>
                        <Image src={'/newsletter.png'} alt='newsletter_icon' width={50} height={50} />
                        <h2 className='text-slate-600 text-2xl'>Newsletter</h2>
                    </div>
                    <p className='text-slate-700 py-6'>Subscribe to our Newsletter! <br></br><br></br>Every week we send out a list of remote jobs straight to your inbox!</p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-4 pt-0">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-sm text-slate-700 font-light">Email</FormLabel>
                        <FormControl>
                            <Input className="text-xs" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className='flex flex-col w-full gap-y-2 md:mt-10 mt-4 md:my-6'>
                    {showErrorMsg && <p className='text-red-900 bg-red-100 rounded-lg px-2 py-2 text-xs'>Something went wrong. Please try again.</p>}
                    {showSuccessMsg && <p className='text-gree-900 bg-green-100 rounded-lg px-2 py-2 text-xs'>Thank you for Subscribing! 🎉</p>}
                    {
                        !showSuccessMsg && 
                            <Button className="text-base bg-white text-slate-700 hover:text-white hover:bg-remotify-db font-regular" type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                    }
                    
                    </div>
                </form>
            </Form>
            </div>
        </>
    )
}
