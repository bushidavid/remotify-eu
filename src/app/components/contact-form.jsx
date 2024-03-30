'use client';

import { useState } from "react";
import {Textarea} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import { sendEmail } from "../actions/actions";

export default function ContactForm() {

    const [form, setForm] = useState({
        customerName: null,
        customerEmail: null,
        customerSubject: null,
        customerMessage: null,
    })

    const onSubmitForm = () => {
        const success = sendEmail(form);

        if(!success){
            alert('Error sending the email');
        }
    }

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    

    return (
        <form className="flex flex-col justify-center max-w-4xl w-full h-full my-10" onSubmit={onSubmitForm}>
            <div className="my-10 min-w-4/12">
                <h1 className="text-4xl mb-4">Contact Us</h1>
                <Input className="w-full" type="text" variant="underlined" label="Your Name" name="customerName" isRequired onChange={e => handleChange(e)}/>  
            </div>
            <div className="mb-10">
                <Input isRequired type="email" variant={"underlined"} label="Your Email" name="customerEmail" onChange={e => handleChange(e)}/>
            </div>
            <div className="mb-10 min-w-4/12">
                <Input className="w-full" type="text" variant="underlined" label="Subject" name="customerSubject" isRequired onChange={e => handleChange(e)}/>  
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
            <button type="submit" className="w-96 px-3 py-2 my-12 border-2 text-white rounded-lg bg-remotify-db">Submit</button>
        </form>
        
    )
}
