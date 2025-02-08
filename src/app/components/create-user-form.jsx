"use client";

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '../actions/actions';


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
import { createClient } from '../../../lib/utils/supabase/client';


const FormSchema = z.object({
    name: z.string(),
      // .min(1, {
      // message: "Name is required.",
      // }), 
    surname: z.string(),
    email: z.string().email({
      message: "Please enter a valid email address.",
      }),
    password: z.string().min(4, {
      message: "Password is required.",
      }),
})
  
export default function CreateUserForm() {

    const isFirstRender = useRef(true);

    const [loading, setLoading] = useState(false);
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams()

    const supabase = createClient();
  
    const search = searchParams.get('callbackUrl');

    const index = search?.indexOf("plan=")

    const plan = index == -1 ? 0 : search?.slice(index + 5);
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
        },
    });  
    
    const createNewUser = async (data) => {

      setLoading(true);

        const { data: user, error } = await supabase.auth.admin.createUser({
            email: data.email,
            password_hash: data.password,
            email_confirm: true,
            user_metadata: {
                name: data.name,
                full_name: data.name + " " + data.surname,
                last_name: data.surname,
                role: "candidate"
            }
        })

        console.log(user)

        if(error){
            console.log("Error creating user: ", error);
            setDisplaySuccessMessage(true);
            return false;
        }

        if(user){
          console.log("user created successfully");
          setDisplaySuccessMessage(true);
        }
      
        setLoading(false);

        return true;
        
    }
      
    const onSubmit = async (data) => {

      setLoading(true);

      const result = await createNewUser(data);

      if (!result) {
        setDisplayErrorMessage(true); // update the state with the error message
      } else {
        setDisplaySuccessMessage(true);
      }

      setLoading(false);

    }

    useEffect(() => {
      const subscription = form.watch((value, { name }) => {
        if (name === "email" || name === "password") {
          setDisplayErrorMessage(false);
        }
      });
      return () => subscription.unsubscribe();
    }, [form]);
  

    useEffect(() => {
      if (isFirstRender.current || status !== 'authenticated') {
        isFirstRender.current = false;
        return;
      }
    
      console.log("logging search: ", search);
    
      if (search == null) {
        router.push("/");
      } else if (plan !== 0) {
        const stripeCheckout = async () => {
          const res = await fetch('/api/subscribe-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              priceId: [plan],
              // email: session?.user?.email
            })
          });
    
          const response = await res.json();
          router.push(response.url);
        };
    
        stripeCheckout();
      } else {
        router.push(callbackUrl); // redirect to callbackUrl if no plan
      }
    }, [plan, router, callbackUrl, search]);
  


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-10/12 md:w-8/12 md:space-y-6">
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
                <div className='flex flex-col w-fit gap-y-2 md:mt-10 mt-4 md:my-6'>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                  {displayErrorMessage && <p className='text-red-900 bg-red-100 rounded-lg px-2 py-2 text-xs md:text-sm'>Invalid Email or Password</p>}
                  {displaySuccessMessage && <p className="text-green-700">User Created Successfully 🎉</p>}
                </div>
            </form>
        </Form>
);
}




