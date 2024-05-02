'use client';

import { use, useState } from "react";
import {Textarea} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import { sendEmail } from "../actions/actions";
import Image from "next/image";
import Link from "next/link";

export default function ContactForm() {

    const [form, setForm] = useState({
        customerName: null,
        customerEmail: null,
        customerSubject: "I want to post a Free Job for launch day",
        customerMessage: null,
    })

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [botControl, setBotControl] = useState(true);

    const onSubmitForm = (e) => {

        console.log("submitting");

        e.preventDefault();

        const emailSent = sendEmail(form);
        setSuccess(emailSent);
        setError(!emailSent);
        setShowButton(!emailSent);
    }

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    

    return (
        <form className="flex flex-col justify-center max-w-4xl w-11/12 md:w-full h-full my-10" onSubmit={e => onSubmitForm(e)}>
            <div className="my-10 min-w-4/12">
                <h1 className="text-4xl mb-4">Contact Us</h1>
                <div className="">
                    <h2 className="text-md text-slate-600">Fill in the form below or contact us at: <Link href="mailto:sales@remotifyeurope.com">sales@remotifyeurope.com</Link> </h2>
                </div>
                <Input className="w-full" type="text" variant="underlined" label="Your Name" name="customerName" isRequired onChange={e => handleChange(e)}/>  
            </div>
            <div className="mb-10">
                <Input isRequired type="email" variant={"underlined"} label="Your Email" name="customerEmail" onChange={e => handleChange(e)}/>
            </div>
            <div className="mb-10 min-w-4/12">
                <Input className="w-full" type="text" variant="underlined" value={form.customerSubject} label="Subject" name="customerSubject" isRequired onChange={e => handleChange(e)}/>  
            </div>
            <div className="hidden mb-10 min-w-4/12">
                <Input className="w-full" type="text" variant="underlined" label="control" name="control" onChange={() => setBotControl(false)}/>  
            </div>
            
            <Textarea
                key="faded"
                variant="underlined"
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="min-w-4/12 mb-6 md:mb-0"
                isRequired
                name="customerMessage"
                onChange={e => handleChange(e)}
            />
            { showButton && <button type="submit" disabled={!botControl} className="w-96 disabled:opacity-50 px-3 py-2 my-12 border-2 text-white rounded-lg bg-remotify-db">Submit</button> }
            { success && <p className="text-green-900 my-2">Email sent successfully</p> }
            { error &&  <p className="text-red-900 my-2">Error sending email</p>}
        </form>
        
    )
}