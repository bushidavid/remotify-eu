'use client';

import { useState } from "react";
import {Textarea} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";

export default function ContactForm() {

    const [form, setForm] = useState({
        customerName: null
    })

    const onSubmitForm = () => {
        console.log("submit")
    }

    const handleChange = () => {
        console.log(handleChange)
    }

    

    return (
        <form className="flex flex-col justify-center max-w-4xl w-full h-full my-10" onSubmit={onSubmitForm}>
            <div className="my-10 min-w-4/12">
                <h1 className="text-4xl mb-4">Contact Us</h1>
                <Input className="w-full" type="text" variant="underlined" label="Your Name" name="customerName" isRequired onChange={handleChange}/>  
            </div>
            <div className="mb-10">
                <Input isRequired type="email" variant={"underlined"} label="Your Email" name="customerEmail" />
            </div>
            <div className="mb-10 min-w-4/12">
                <Input className="w-full" type="text" variant="underlined" label="Subject" name="customerSubject" isRequired onChange={handleChange}/>  
            </div>
            
            <Textarea
                key="faded"
                variant="underlined"
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="min-w-4/12 mb-6 md:mb-0"
                isRequired
                name="customerDescription"
            />
            <button type="submit" className="w-96 px-3 py-2 my-12 border-2 text-white rounded-lg bg-remotify-db">Submit</button>
        </form>
        
    )
}
