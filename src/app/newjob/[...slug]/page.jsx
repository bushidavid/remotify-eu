'use client';

import React, {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import {Switch} from "@nextui-org/switch";
import { useRouter } from "next/navigation";
import { Categories } from '../../../../lib/departments';
import { Levels } from "../../../../lib/levels";
import TipTap from "@/app/components/tiptap/tiptap";
import {Countries} from "../../../../lib/countries";
import supabase from "../../../../lib/config/supabaseClient";




export default function Page ({ params }) {

    const id = params.slug;

    // *selected status for Worldwide Switch
    const [ isSelected, setIsSelected] = useState(false);
    const [ compDescription, setCompDescription ] = useState("");
    const [ jobDescription, setJobDescription ] = useState("");
    const [logo, setLogo] = useState([]);

    // const handlePayment = async (e) => {

    //     e.preventDefault();

    //     const response  = await fetch('/api/payment' ,{
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             priceId: id
    //         })
    //     })

    //     const data = await response.json();
        
    //     router.push(data.url);

    // }


    const [form, setForm] = useState({
        jobTitle : "",
        jobCountry: "",
        jobDepartment: "",
        jobDescription: "",
        compDescription: "",
        companyName: "",
        worldwide: true,
        salaryMin: "",
        salaryMax: "",
        // candidateLevel: [],
        salaryCur: "",
        logoUrl: "",
    })
    
    const options = [];

    const [values, setValues] = useState(new Set([]));
    const [selectedCountry, setSelectedCountry] = useState(new Set([]));

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

    //countries.forEach(country => options.push({value: country.country_name, label: country.country_code2}))

    const onSubmitForm = async (e) => {
        // handlePayment(id[0]);

        e.preventDefault();

        try {

            const { data, error } = await supabase
            .storage
            .from('RemotifyLogoImages')
            .upload(`logos/${logo.name}`, logo, {
                cacheControl: '3600',
                upsert: false
            });

            console.log("upload of image finished");

            const { data: publicURL } = await supabase.storage.from('RemotifyLogoImages').getPublicUrl(`logos/${logo.name}`);

            // if(logoError){
            //     console.log('Logo URL error retrieval:', logoError);
            //     return;
            // }


            const logoUrl = publicURL.publicUrl;

            setForm((prevForm) => ({
                ...prevForm,
                logoUrl: logoUrl
            }));

            console.log("printing the form: \n");
            console.log(form);
            

            const result = await fetch('/api/create-job', {
                    method: 'POST',
                    headers: {   
                            ContentType: 'application/json',
                        },
                    body: JSON.stringify(form)
            });


        } catch (err) {
            console.log("printing error message: \n", err.message);
        }
    }

    
    // const handleChange = (selectedOptions) => {
    //     setJobCountry(selectedOptions.map(country => country.value));
    // }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        console.log(form);
    }

    const handleSwitchChange = (e) => {

        setIsSelected(prev => !prev);

        setForm({
            ...form,
            worldwide: isSelected,
        });

        if(isSelected){
            setForm({
                ...form,
                jobCountry: ""
            })
        }

        console.log(form);
    }


    const handleLogo = (e) => {
        setLogo(e.target.files[0]);
    }

    
    return (
        <>
        <h1 className="text-4xl mt-20">Tell us about the position</h1>
        <form className="grid grid-cols-12 grid-rows-layout justify-center items-center place-self-center max-w-4xl w-full h-full" onSubmit={onSubmitForm}>

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
                <Switch name="worldwide" isSelected={isSelected} onValueChange={handleSwitchChange}>
                </Switch>
            </div>
            {/*  Worldwide  End */}

            {/* Countries */}

            <div className={`col-start-8 col-span-5 row-start-3 ${isSelected ? "hidden invisible" : ""}`} >
                    <Select label="Countries"
                        selectionMode="multiple"
                        placeholder="Select one or more countries"
                        variant="underlined"
                        className=""
                        selectedKeys={selectedCountry}
                        onChange={handleSelectionChangeCountry}
                        isRequired={!isSelected}
                        name="countries"
                    >
                        {
                            Countries.map(country => (
                                <SelectItem key={country.label} value={country.label}>{country.name}</SelectItem>
                            ))
                        }
                    </Select>
                    <p className="text-small text-default-500">{Array.from(selectedCountry).join(", ")}</p>
            </div>

            {/* Countries End */}


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
                    <p className="text-small text-default-500">{Array.from(values).join(", ")}</p>
            </div>

            {/*  candidate Level End */}

            {/*  Job Description */}
            
            <div className="col-span-full row-start-4">
                <h3 className="text-2xl mb-2">Tell us more about the role:</h3>
                <TipTap setDescription={updateJobDescription} />
            </div>

            {/*  Job Description End */}

            {/*  Company Name*/}
            
            <div className="col-start-1 col-span-full row-start-5 row-span-1 mt-20 mb-20">
                <h1 className="text-4xl mb-10">Tell us about your Company</h1>
                <Input className="" type="text" variant="underlined" label="Company Name" name="companyName" isRequired onChange={handleChange}/>  
            </div>

            {/* Company Name End */}

            {/* Company Logo */}
            
            <div className="flex flex-col justify-center col-start-1 col-span-full bg-white w-full h-full row-start-6 items-center place-self-center border-1 border-dashed border-zinc-700 rounded-lg">
            
                <label htmlFor='logo'>Upload an image</label>
                <input type='file' name="logo" onChange={(e) => (handleLogo(e))}></input>
        
            </div>        

            {/* Company Logo End */}

            {/* Company Description */}          
            
            <div className="col-start-1 col-span-full row-start-8 ">
                <h3 className="text-2xl">Tell us more about your company:</h3>
                <TipTap setDescription={updateCompDescription}/>
                <div dangerouslySetInnerHTML={{ __html: compDescription }} />
            </div>

            {/* Company Description End */}    

            {/* Salary */} 
            
            <div className="w-96 row-start-[8]">
                <label className='' htmlFor="salary-min">Salary Range</label>
                <div className="flex flex-row justify-between gap-4 w-full">
                   <Input className="" type="text" name="salaryMin" variant="underlined" label="Salary Min" onChange={handleChange} />  
                   <Input className="" type="text" name="salaryMax" variant="underlined" label="Salary Max" onChange={handleChange} />  
                   <Input className="" type="text" name="salaryCur" variant="underlined" label="Currency" onChange={handleChange} />  
                </div>
            </div>

            {/* Salary End */} 

            <button type="submit" className="col-start-5 col-span-3 row-start-[9] row-span-1 w-96 px-3 py-2 my-12 border-2 rounded-lg shadow-sm border-remotify-lb hover:bg-remotify-lb focus:ring-1 focus:ring-indigo-500">Submit</button>
        </form>
        </>
    );
}
 