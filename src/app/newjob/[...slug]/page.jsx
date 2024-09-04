'use client';

import React, {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import {Select, SelectItem, SelectSection} from "@nextui-org/select";
import {Switch} from "@nextui-org/switch";
import { useRouter } from "next/navigation";
import { Categories } from '../../../../lib/departments';
import { Levels } from "../../../../lib/levels";
import TipTap from "@/app/components/tiptap/tiptap";
import {Countries, Regions} from "../../../../lib/countries";
import supabase from "../../../../lib/config/supabaseClient";
import { Tags } from "../../../../lib/tags";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { sign } from "jsonwebtoken";
import Credentials from "next-auth/providers/credentials";


export default function Page ({ params }) {

    
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() { signIn(Credentials, {callbackUrl: `/newjob/${params.slug}`})}
    })


    const router = useRouter();

    const id = params.slug;
    var newJobId = "";

    // *selected status for Worldwide Switch
    const [ compDescription, setCompDescription ] = useState("");
    const [ jobDescription, setJobDescription ] = useState("");
    const [logo, setLogo] = useState([]);

    const [values, setValues] = useState(new Set([]));
    const [selectedCountry, setSelectedCountry] = useState(new Set([]));
    const [selectedTags, setSelectedTags] = useState([]);

    const [logoURL, setLogoURL] = useState(null);



    const handlePayment = async (newJobId) => {

        const response  = await fetch('/api/payment' ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                priceId: id,
                newJobId,
                user: {
                    email: session.user.email,
                    name: session.user.name,
                    id: session.user.id
                }
            })
        })

        const data = await response.json();
        
        router.push(data.url);

        return;

    }


    const [form, setForm] = useState({
        jobTitle : "",
        jobCountry: null,
        worldwide: false,
        jobDepartment: "",
        jobDescription: "",
        compDescription: "",
        companyName: "",
        companyId: session?.user.id,
        salaryMin: "",
        salaryMax: "",
        candidateLevel: "",
        salaryCur: "",
        logoUrl: "",
        tags: "",
        jobLink: "",
        companyWebsite: ""
    })
    
    

    const handleSelectionChangeCountry = (e) => {

        setSelectedCountry(new Set(e.target.value.split(",")));

        handleChange(e);
        
    };

    const handleSelectionChange = (e) => {
        setValues(new Set(e.target.value.split(",")));

        handleChange(e);
    };

    const updateJobDescription = (description) => {
        setForm((prevForm) => ({
            ...prevForm,
            jobDescription: description,
        }))
    }

    const updateCompDescription = (description) => {
        setForm((prevForm) => ({
            ...prevForm,
            compDescription: description,
        }))
    }


    const onSubmitForm = async (e) => {
       
        e.preventDefault();
        

        try {

            const result = await fetch('/api/create-job', {
                method: 'POST',
                headers: {   
                        ContentType: 'application/json',
                    },
                body: JSON.stringify(form)
            }).then(data => data.json()).then(data => newJobId = data.message);


        } catch (err) {
            console.log("printing error message: \n", err.message);
        }

        handlePayment(newJobId);
    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        console.log(form);

    }

    const handleSwitchChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });

    }

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            logoUrl: logoURL
        }));
    }, [logoURL])


    const handleLogo = async (e) => {
        setLogo(e.target.files[0]);

        const { data, error } = await supabase
        .storage
        .from('RemotifyLogoImages')
        .upload(`logos/${e.target.files[0].name}`, e.target.files[0], {
            cacheControl: '3600',
            upsert: false
        });

        const { data: publicURL } = await supabase
                .storage.from('RemotifyLogoImages')
                .getPublicUrl(`logos/${e.target.files[0].name}`);


        setLogoURL(publicURL.publicUrl);

    }

    const handleSelectionChangeTag = (e) => {

        setSelectedTags(new Set(e.target.value.split(",")));

        console.log(selectedTags);

        handleChange(e);
    };


    
    return (
        <>
        <h1 className="text-4xl mt-20">Tell us about the position</h1>
        <form className="grid grid-cols-12 grid-rows-layout justify-center items-center max-w-4xl w-full h-full" onSubmit={onSubmitForm}>

            {/*  Job Title */}
            <div className="col-start-1 col-span-full row-start-1 row-span-1">
                <Input className="" type="text" variant="underlined" label="Job Title" isRequired name="jobTitle" onChange={handleChange}/>  
            </div>
            {/*  Job Title End */}

            {/*  Job Category */}
             <div className="col-start-1 col-span-2 row-start-2 row-span-1">
                <div>
                    <Select label="Category" variant="underlined" className="w-96" id="job-department" name="jobDepartment" isRequired onChange={handleChange} >
                        {
                            Categories.map(category => (
                                <SelectItem key={category.id} value={category.id} >
                                    {category.value}
                                </SelectItem> 
                            ))
                        }
                    </Select>
                </div>
            </div> 
            {/*  Job Category End */}
            
            {/*  Worldwide */}
            <div className="col-start-1 col-span-4 row-start-3 row-span-1 flex flex-row justify-around">
                <p>Is this a worldwide position?</p>
                <Switch name="worldwide" isSelected={form.worldwide} onChange={e => handleSwitchChange(e)}>
                </Switch>
            </div>
            {/*  Worldwide  End */}

            {/* Countries */}

            <div className={`col-start-8 col-span-5 row-start-3 ${form.worldwide ? "hidden invisible" : ""}`} >
                    <Select label="Countries or Regions"
                        selectionMode="multiple"
                        placeholder="Select one or more countries"
                        variant="underlined"
                        className=""
                        selectedKeys={selectedCountry}
                        onChange={handleSelectionChangeCountry}
                        isRequired={!form.worldwide}
                        name="jobCountry"
                    >
                        <SelectSection 
                        showDivider 
                        title="Regions"
                        classNames={{
                            heading: "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small"
                            }}
                        >
                        {
                            Regions.map(region => (
                                <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                            ))
                        }
                        </SelectSection>
                        <SelectSection 
                        showDivider 
                        title="Countries"
                        classNames={{
                            heading: "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small"
                            }}
                        >
                        {
                            Countries.map(country => (

                                <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                            ))
                        }
                        </SelectSection>
                    </Select>
            </div>

            {/* Countries End */}

            {/* Select Tags */}
            
            <div className="col-start-1 col-span-full row-start-4 row-span-1">
                <div>
                    <Select 
                        label="Tags" variant="underlined" 
                        className="w-full" id="job-department" 
                        name="tags" 
                        isRequired 
                        onChange={handleSelectionChangeTag}
                        selectionMode="multiple"
                        selectedKeys={selectedTags}
                        >
                            
                        {
                            Tags.map(tags => (
                                <SelectItem key={tags.id} value={tags.id} >
                                    {tags.value}
                                </SelectItem> 
                            ))
                        }
                    </Select>
                </div>
            </div> 

            {/* End Select Tags */}

            {/*  Job link */}
            <div className="col-start-1 col-span-full row-start-5 row-span-1">
                <Input className="" type="text" variant="underlined" label="Link to the job post" isRequired name="jobLink" onChange={handleChange}/>  
            </div>
            {/*  Job Link End */}


            {/*  candidate Level */}

            <div className="col-start-8 col-span-5 row-start-2">
                    <Select label="Candidate Level"
                        selectionMode="multiple"
                        placeholder="Select a Level"
                        variant="underlined"
                        className=""
                        selectedKeys={values}
                        onChange={handleSelectionChange}
                        isRequired
                        name="candidateLevel"
                    >
                        {
                            Levels.map(level => (
                                <SelectItem key={level.id} value={level.id}>{level.value}</SelectItem>
                            ))
                        }
                    </Select>
            </div>

            {/*  candidate Level End */}

            {/*  Job Description */}
            
            <div className="col-span-full row-start-6">
                <h3 className="text-2xl mb-2">Tell us more about the role:</h3>
                <TipTap setDescription={updateJobDescription} />
            </div>

            {/*  Job Description End */}

            {/*  Company Name*/}
            
            <div className="col-start-1 col-span-full row-start-7 row-span-1 mt-20 mb-20">
                <h1 className="text-4xl mb-10">Tell us about your Company</h1>
                <Input className="" type="text" variant="underlined" label="Company Name" name="companyName" isRequired onChange={handleChange}/>  
            </div>

            {/* Company Name End */}

             {/*  Company Website*/}
            
             <div className="col-start-1 col-span-full row-start-8 row-span-1 mt-20 mb-20">
                <Input className="" type="text" variant="underlined" label="Company Website" name="companyWebsite" isRequired onChange={handleChange}/>  
            </div>

            {/* Company Website End */}

            {/* Company Logo */}
            
            <div className="flex flex-col justify-center col-start-1 col-span-full bg-white w-full h-full row-start-9 items-center place-self-center border-1 border-dashed border-zinc-700 rounded-lg">
            
                <label htmlFor='logo'>Upload an image</label>
                <input type='file' name="logo" onChange={(e) => (handleLogo(e))}></input>
        
            </div>        

            {/* Company Logo End */}

            {/* Company Description */}          
            
            <div className="col-start-1 col-span-full row-start-10 ">
                <h3 className="text-2xl">Tell us more about your company:</h3>
                <TipTap setDescription={updateCompDescription}/>
                <div dangerouslySetInnerHTML={{ __html: compDescription }} />
            </div>

            {/* Company Description End */}    

            {/* Salary */} 
            
            <div className="w-96 row-start-[11]">
                <label className='' htmlFor="salary-min">Salary Range</label>
                <div className="flex flex-row justify-between gap-4 w-full">
                   <Input className="" type="text" name="salaryMin" variant="underlined" label="Salary Min" onChange={handleChange} />  
                   <Input className="" type="text" name="salaryMax" variant="underlined" label="Salary Max" onChange={handleChange} />  
                   <Input className="" type="text" name="salaryCur" variant="underlined" label="Currency" onChange={handleChange} />  
                </div>
            </div>

            {/* Salary End */} 

            <button type="submit" className="col-start-5 col-span-3 row-start-[12] row-span-1 w-96 px-3 py-2 my-12 border-2 rounded-lg shadow-sm border-remotify-lb hover:bg-remotify-lb focus:ring-1 focus:ring-indigo-500">Submit</button>
        </form>
        </>
    );
}
 