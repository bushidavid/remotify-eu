'use client';

import React from 'react'
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

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
    lastName: z.string().min(1, {
        message: "Last Name is required.",
        }), 
    email: z.string().email({
        message: "Please enter a valid email address.",
        }),
    consent: z.boolean().refine((val) => val === true, {
        message: "Consent is required.",
    }),
})


export default function SubscribeForm() {

    const [loading, setLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);    

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            consent: false,
        },
    });

    const onSubmit = async (data) => {

        console.log("inside on submit");
        setLoading(true);
  
        const result = await fetch('/api/subscribe-lead-magnet', {
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
            <div className='lg:flex flex-col w-11/12 md:w-6/12 h-fit my-20 rounded-xl shadow-xl bg-white border-[2px] border-remotify-lb items-center justify-center'>
                <div className='lg:flex flex-col p-4 my-4 mx-2 md:mx-10 pb-0 items-center'>
                    <div className='flex flex-row items-center justify-around'>
                        <h1 className='text-slate-900 text-xl md:text-3xl font-bold text-center'>150+ Companies hiring remotely in Europe and Worldwide</h1>
                    </div>
                    <p className='text-slate-500 w-full py-8 text-center'>Simply fill in the form below and we’ll send you the list of companies.</p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-11/12 space-y-4 md:space-y-4 md:space-x-4 p-4 pt-0 md:flex md:flex-row md:flex-wrap justify-center items-center">
                    <div className='w-full flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0'>
                        <FormField
                            control={form.control}
                            className="w-full md:w-6/12"
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0 w-full md:w-[40%]">
                                <FormLabel className="text-sm text-slate-700 font-light">Name*</FormLabel>
                                <FormControl>
                                    <Input className="text-xs" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            className="w-full md:w-6/12"
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="space-y-0 w-full md:w-[40%]">
                                <FormLabel className="text-sm text-slate-700 font-light">Last Name*</FormLabel>
                                <FormControl>
                                    <Input className="text-xs " placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormField
                        control={form.control}
                        className="w-full md:w-6/12 mt-4" 
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-0 md:w-[40%] mt-4">
                            <FormLabel className="text-sm text-slate-700 font-light">Email*</FormLabel>
                            <FormControl>
                                <Input className="text-xs" placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 md:w-9/12">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            id="consent"
                                        />
                                    </FormControl>
                                    <FormLabel htmlFor="consent" className="text-xs lg:text-sm font-light">
                                        I consent to receive emails from RemotifyEurope with updates and remote work news. I understand I can unsubscribe at any time. *
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    
                    <div className='flex flex-col w-full gap-y-2'>
                        {showErrorMsg && <p className='text-red-900 bg-red-100 rounded-lg px-2 py-2 text-xs'>Something went wrong. Please try again.</p>}
                        {showSuccessMsg && <p className='text-gree-900 bg-green-100 rounded-lg px-2 py-2 text-xs'>Thank you! Your file is on the way! 🎉</p>}
                        {
                            !showSuccessMsg && 
                                <Button className="text-base font-light bg-remotify-lb text-white rounded-xl  hover:text-white hover:bg-teal-500 font-regular py-8" type="submit" disabled={loading}>
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
