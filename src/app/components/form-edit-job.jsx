'use client';

import React, {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import {Switch} from "@nextui-org/switch";
import { useRouter } from "next/navigation";
import { Categories } from '../../../lib/departments';
import { Levels } from "../../../lib/levels";
import TipTap from "@/app/components/tiptap/tiptap";
import {Countries} from "../../../lib/countries";
import supabase from "../../../lib/config/supabaseClient";
import { Tags } from "../../../lib/tags";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import JobHero from "./job-hero";
import JobDetails from "./job-details";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


function compareObjects(obj1, obj2) {
    // Get the keys of the first object
    const keys = Object.keys(obj1);

    // Check if the number of keys is the same in both objects
    if (keys.length !== Object.keys(obj2).length) {
        return false;
    }

    // Iterate over the keys and compare the values
    for (let key of keys) {
        // Check if the key exists in both objects
        if (!obj2.hasOwnProperty(key)) {
            return false;
        }

        // Compare the values of the properties
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    // If all property values match, return true
    return true;
}


export default function FormEditJob ({ job }) {

    const {data: session, loading} = useSession({
        required: true,
        onUnauthenticated(){    
            redirect('api/login')
        }
    });


    const postedDate = new Date(job.created_at);
    const expirationDate = new Date(job.expiration_date);
  
    const postedFormatted = postedDate.toLocaleString('lu-LU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  
    const expirationFormatted = expirationDate.toLocaleString('lu-LU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const router = useRouter();

    // selected status for Worldwide Switch
    const [ compDescription, setCompDescription ] = useState();
    const [ jobDescription, setJobDescription ] = useState();
    const [logo, setLogo] = useState(job.logo_url);
    const [edit, setEdit] = useState(true);
    const [compare, setCompare] = useState(true);

    const [values, setValues] = useState(new Set([job.exp_names]));
    const [selectedCountry, setSelectedCountry] = useState(new Set([job.country_ids?.split(',')]));
    const [selectedTags, setSelectedTags] = useState(new Set([job.tag_ids?.split(',')]));

    const [logoURL, setLogoURL] = useState(null);

    const handlePayment = async (newJobId) => {

        const response  = await fetch('/api/payment' ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                priceId: id,
                newJobId
            })
        })

        const data = await response.json();
        
        router.push(data.url);

        return;

    }

   
    const [form, setForm] = useState({
        jobId: job.id,
        jobTitle : job.job_title,
        jobCountry: "",
        worldwide: job.worldwide,
        jobDepartment: job.category,
        jobDescription: job.job_description,
        compDescription: job.company_description,
        companyName: job.company_name,
        salaryMin: job.salary_range_min,
        salaryMax: job.salary_range_max,
        candidateLevel: "",
        salaryCur: job.currency,
        logoUrl: job.logo_url,
        tags: "",
        jobLink: job.job_link,
        companyWebsite: job.company_website
    })

    const [updatedForm, setUpdatedForm] = useState({
        jobId: job.id,
        jobTitle : job.job_title,
        jobCountry: "",
        worldwide: job.worldwide,
        jobDepartment: job.category,
        jobDescription: job.job_description,
        compDescription: job.company_description,
        companyName: job.company_name,
        salaryMin: job.salary_range_min,
        salaryMax: job.salary_range_max,
        candidateLevel: "",
        salaryCur: job.currency,
        logoUrl: job.logo_url,
        tags: "",
        jobLink: job.job_link,
        companyWebsite: job.company_website
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

        setUpdatedForm((prevForm) => ({
            ...prevForm,
            jobDescription: description,
        }))
    }

    const updateCompDescription = (description) => {
        setForm((prevForm) => ({
            ...prevForm,
            compDescription: description,
        }))

        setUpdatedForm((prevForm) => ({
            ...prevForm,
            jobDescription: description,
        }))
    }


    const onSubmitForm = async (e) => {
       
        e.preventDefault();
        
        const body = {
            oldForm:  {...form},
            newForm: {...updatedForm}
        }

        try {

            const result = await fetch('/api/update-job', {
                method: 'PATCH',
                headers: {   
                        ContentType: 'application/json',
                    },
                body: JSON.stringify(body)
            }).then(data => data.json()).then(data => newJobId = data.message);


        } catch (err) {
            console.log("printing error message: \n", err.message);
        }
    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setUpdatedForm({
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

    useEffect(() => {
        setCompare(compareObjects(form, updatedForm));
    }, [form, updatedForm])


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

        handleChange(e);
    };

    const handleDelete = async () => {
        const response = await fetch('/api/delete-job', {
            method: 'DELETE',
            headers: {   
                    ContentType: 'application/json',
                },
            body: JSON.stringify({id: job.id})
        })

        const res = await response.json();

        console.log(res);

        router.push(`/company/${job.companyId}/dashboard`)
    }

    
    return (

        <>
        <div className="flex flex-row">
            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-md py-2 mx-2 my-2">Delete Job</button>
            {edit && <button onClick={() => setEdit(!edit)} className="bg-slate-500 hover:bg-red-700 text-white px-6 rounded-md py-2 mx-2 my-2">Edit Job</button>}
            {/* {!edit && <button className="bg-green-500 hover:bg-red-700 text-white px-6 rounded-md py-2 mx-2 my-2" disabled={compare}>Save</button>} */}
            {!edit && <button onClick={() => setEdit(!edit)} className="bg-green-500 hover:bg-red-700 text-white px-6 rounded-md py-2 mx-2 my-2">Cancel</button>}
         </div>
        { !edit === true ? (
            <>
       
        
                <h1 className="text-4xl mt-20">Click on Edit to edit job</h1>
                <form className="grid grid-cols-12 grid-rows-layout justify-center items-center max-w-4xl w-full h-full" onSubmit={onSubmitForm}>

                    {/*  Job Title */}
                    <div className="col-start-1 col-span-full row-start-1 row-span-1">
                        <Input className="" type="text" variant="underlined" label="Job Title" isRequired name="jobTitle" onChange={handleChange} value={form.jobTitle} disabled={edit}/>  
                    </div>
                    {/*  Job Title End */}

                    {/*  Job Category */}
                    <div className="col-start-1 col-span-2 row-start-2 row-span-1">
                        <div>
                            <Select label="Category" variant="underlined" className="w-96" id="job-department" name="jobDepartment" isRequired onChange={handleChange} disabled={edit}>
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
                        <Switch name="worldwide" isSelected={form.worldwide} onChange={e => handleSwitchChange(e)} disabled={edit}>
                        </Switch>
                    </div>
                    {/*  Worldwide  End */}

                    {/* Countries */}

                    <div className={`col-start-8 col-span-5 row-start-3 ${form.worldwide ? "hidden invisible" : ""}`} >
                            <Select label="Countries"
                                selectionMode="multiple"
                                placeholder="Select one or more countries"
                                variant="underlined"
                                className=""
                                selectedKeys={selectedCountry}
                                onChange={handleSelectionChangeCountry}
                                isRequired={!form.worldwide}
                                name="jobCountry"
                                disabled={edit}
                            >
                                {
                                    Countries.map(country => (
                                        <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                                    ))
                                }
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
                                disabled={edit}
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
                        <Input className="" type="text" variant="underlined" label="Link to the job post" isRequired name="jobLink" onChange={handleChange} disabled={edit}/>  
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
                                disabled={edit}
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
                        <TipTap setDescription={updateJobDescription} content={job.job_description} />
                    </div>

                    {/*  Job Description End */}

                    {/*  Company Name*/}
                    
                    <div className="col-start-1 col-span-full row-start-7 row-span-1 mt-20 mb-20">
                        <h1 className="text-4xl mb-10">Tell us about your Company</h1>
                        <Input className="" type="text" variant="underlined" label="Company Name" name="companyName" isRequired onChange={handleChange} value={form.companyName} disabled={edit}/>  
                    </div>

                    {/* Company Name End */}

                    {/*  Company Website*/}
                    
                    <div className="col-start-1 col-span-full row-start-8 row-span-1 mt-20 mb-20">
                        <Input className="" type="text" variant="underlined" label="Company Website" name="companyWebsite" isRequired onChange={handleChange} value={form.companyWebsite} disabled={edit}/>  
                    </div>

                    {/* Company Website End */}

                    {/* Company Logo */}
                    
                    <div className="flex flex-col justify-center col-start-1 col-span-full bg-white w-full h-full row-start-9 items-center place-self-center border-1 border-dashed border-zinc-700 rounded-lg">
                    
                        <label htmlFor='logo'>Upload an image</label>
                        <input type='file' name="logo" onChange={(e) => (handleLogo(e))} disabled={edit}></input>
                
                    </div>        

                    {/* Company Logo End */}

                    {/* Company Description */}          
                    
                    <div className="col-start-1 col-span-full row-start-10 ">
                        <h3 className="text-2xl">Tell us more about your company:</h3>
                        <TipTap setDescription={updateCompDescription} content={job.company_description} setEdit={setEdit}  />
                        <div dangerouslySetInnerHTML={{ __html: compDescription }} />
                    </div>

                    {/* Company Description End */}    

                    {/* Salary */} 
                    
                    <div className="w-96 row-start-[11]">
                        <label className='' htmlFor="salary-min">Salary Range</label>
                        <div className="flex flex-row justify-between gap-4 w-full">
                        <Input className="" type="text" name="salaryMin" variant="underlined" label="Salary Min" onChange={handleChange} value={form.salaryMin} disabled={edit}/>  
                        <Input className="" type="text" name="salaryMax" variant="underlined" label="Salary Max" onChange={handleChange} value={form.salaryMax} disabled={edit}/>  
                        <Input className="" type="text" name="salaryCur" variant="underlined" label="Currency" onChange={handleChange} value={form.salaryCur} disabled={edit}/>  
                        </div>
                    </div>

                    {/* Salary End */} 

                    <button type="submit" className="col-start-5 col-span-3 row-start-[12] row-span-1 w-96 px-3 py-2 my-12 border-2 rounded-lg shadow-sm border-remotify-lb hover:bg-remotify-lb focus:ring-1 focus:ring-indigo-500">Submit Changes</button>
                </form> 
            </>) :
            (
                <>
                    <section className='w-10-12 mt-10 px-4'>
            
                    <JobHero job={job} postedDate={postedFormatted}/>
                        <section className='flex flex-row justify-between relative w-full min-w-full'>
                            <div className='sticky top-0'>
                            <JobDetails job={job}/>
                            
                            </div>
                            <div className='flex flex-col h-fit items-center mt-4 sticky top-10 z-50'>
                                <Image src={job.logo_url ? job.logo_url : '/Logo.jpg'} width={200} height={200} alt="company_logo"></Image>
                                <div className='flex flex-row mt-1'>
                                    <FontAwesomeIcon icon={faLink} /><Link className="hover:underline ml-2" href={job.company_website ? job.company_website : '/'}>{job.company_name}</Link>
                                </div>
                                <div className="flex flex-row flex-wrap justify-center">
                                        {job.tag_names.split(',').map(tag => (
                                            <p className={`border-1 border-remotify-db rounded-md text-[14px] font-medium m-1 p-1`} key={tag}>{tag}</p>
                                    ))}
                                </div>
                                <div>
                                    <p>Valid Until: {expirationFormatted}</p>
                                </div>
                            </div>
                        </section>
                    </section>
                </>
            )
        }
        </>
    );
}
 