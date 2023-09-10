'use client';

import React, {useState, useEffect ,Fragment} from "react";
import {Input} from "@nextui-org/input";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import {Switch} from "@nextui-org/switch";
import CustomEditor from "../../components/custom-editor/custom-editor";
import { useRouter } from "next/navigation";


const Categories = [
    {id: 'Logistics', value : 'Logistics'},
    {id: 'IT & Cybersecurity', value : 'IT & Cybersecurity'},
    {id: 'Software Development', value : 'Software Development'},
    {id: 'Marketing', value : 'Marketing'},
    {id: 'Sales', value : 'Sales'},
    {id: 'Copywriting', value : 'Copywriting'},
    {id: 'Finance', value : 'Finance'},
    {id: 'Engineering', value : 'Engineering'},
    {id: 'Design', value : 'Design'},
    {id: 'HR', value : 'HR'},
    {id: 'Legal', value : 'Legal'},
    {id: 'Data', value : 'Data'},
]

const Levels = [
    {id: 'Junior', value : 'Junior'},
    {id: 'Junior/Mid', value : 'Junior/Mid'},
    {id: 'Middle', value : 'Middle'},
    {id: 'Mid/Senior', value : 'Mid/Senior'},
    {id: 'Senior', value : 'Senior'},

]


export default function NewJob ({ params }) {

    const id = params.slug;

    const handlePayment = async (e) => {

        e.preventDefault();

        const response  = await fetch('/api/payment' ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                priceId: id
            })
        })

        const data = await response.json();
        
        router.push(data.url);

    }


    const[form, setForm] = useState({
        jobTitle : "",
        jobCountry: "",
        jobDepartment: "",
        jobDescription: "",
        compDescription: "",
        companyName: "",
        worldwide: false,
        salaryMin: "",
        salaryMax: "",
        candidateLevel: [],
        salaryCur: "",

    })
    
    const options = [];

    const [values, setValues] = useState(new Set([]));

    const handleSelectionChange = (e) => {
        setValues(new Set(e.target.value.split(",")));

        handleChange(e);
        console.log(form);
    };

    const getCountries = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/api/countries/countries");
            const jsonData = await response.json();
            
            setCountries(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    //countries.forEach(country => options.push({value: country.country_name, label: country.country_code2}))

    const onSubmitForm = (e) => {
        

        handlePayment(id[0]);

        try {
           const selectedCountries = jobCountry.join();
           const job = {jobTitle, selectedCountries, jobDepartment, jobDescription, salaryMin, salaryMax, worldwide, currency, company, compDescription, candidateLevel};
           fetch("http://localhost:3000/api/jobs/create-job", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(job)
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    // useEffect(()=> {
    //     getCountries();
    // }, []);

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

    
    return (
        <>
        <h1 className="text-4xl mt-20">Tell us about the position</h1>
        <form className="grid grid-cols-12 grid-rows-layout justify-center items-center place-self-center max-w-4xl w-full h-full" onSubmit={onSubmitForm}>
            <div className="col-start-1 col-span-full row-start-1 row-span-1">
                <Input className="" type="text" variant="underlined" label="Job Title" isRequired name="jobTitle" onChange={handleChange}/>  
            </div>
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
            
            <div className="col-start-1 col-span-4 row-start-3 row-span-1 flex flex-row justify-around">
                <p>Is this a worldwide position?</p>
                <Switch >
                </Switch>
            </div>
            
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
                                <SelectItem key={level.id} value={level.value}>{level.value}</SelectItem>
                            ))
                        }
                    </Select>
                    <p className="text-small text-default-500">{Array.from(values).join(", ")}</p>
            </div>
            
            <div className="col-span-full row-start-4">
                <h3 className="text-2xl mb-2">Tell us more about the role:</h3>
                <CustomEditor />
            </div>
            
            <div className="col-start-1 col-span-full row-start-5 row-span-1 mt-20">
                <h1 className="text-4xl">Tell us about your Company</h1>
                <Input className="" type="text" variant="underlined" label="Company Name" name="companyName" isRequired onChange={handleChange}/>  
            </div>
            
            <div className="col-start-1 col-span-full row-start-6 items-center place-self-center">
                <h3 className="mb-6">Upload the logo of your Company</h3>
                <label htmlFor="photo" className="border border-1 border-remotify-lb hover:bg-remotify-lb py-4 px-6 rounded-lg place-self-center">Upload an image
                <input 
                    type="file"
                    id="photo" 
                    name="filename"
                    accept="image/*"
                    style={{opacity: "0", zIndex: "-1", position: "absolute"}} 
                />

                </label>
            </div>            
            <div className="col-start-1 col-span-full row-start-8">
                <h3 className="text-2xl mb-2">Tell us more about the role:</h3>
                <CustomEditor />
            </div>
            
            <div className="w-96 row-start-[9]">
                <label className='' htmlFor="salary-min">Salary Range</label>
                <div className="flex flex-row justify-between gap-4 w-full">
                   <Input className="" type="text" name="salaryMin" variant="underlined" label="Salary Min" onChange={handleChange} />  
                   <Input className="" type="text" name="salaryMax" variant="underlined" label="Salary Max" onChange={handleChange} />  
                   <Input className="" type="text" name="salaryCur" variant="underlined" label="Currency" onChange={handleChange} />  
                </div>
            </div>
            <button type="submit" className="col-start-5 col-span-3 row-start-[10] row-span-1 w-96 px-3 py-2 my-12 border-2 rounded-lg shadow-sm border-remotify-lb hover:bg-remotify-lb focus:ring-1 focus:ring-indigo-500">Submit</button>
        </form>
        </>
    );
}
 