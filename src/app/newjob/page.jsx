'use client';

import React, {useState, useEffect ,Fragment} from "react";
import Select from 'react-select'; 

const NewJob = () => {
    
    const [countries, setCountries] = useState([]);
    const [jobTitle, setJobTitle] = useState("");
    const [jobCountry, setJobCountry] = useState([]);
    const [jobDepartment, setJobDepartment] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [compDescription, setCompDescription] = useState("");
    const [company, setCompany] = useState("");
    const [worldwide, setWorldwide] = useState(false);
    const [salaryMin, setSalaryMin] = useState("");0
    const [salaryMax, setSalaryMax] = useState("");
    const [candidateLevel, setCandidateLevel] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const options = [];
    
    const getCountries = async () =>{
        try {
            
            const response = await fetch("http://localhost:3000/api/countries/countries");
            const jsonData = await response.json();
            
            setCountries(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    countries.forEach(country => options.push({value: country.country_name, label: country.country_code2}))

    const onSubmitForm = (e) => {
        e.preventDefault();
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

    useEffect(()=> {
        getCountries();
    }, []);

    const handleChange = (selectedOptions) => {
        setJobCountry(selectedOptions.map(country => country.value));
    }

    
    return (
        <Fragment>

        <form className="flex flex-col justify-center items-center place-self-center max-w-4xl w-full h-full" onSubmit={onSubmitForm}>
            <div className="">
                <label htmlFor="job-title">Job Title</label>
                <div>
                    <input type="text" className="w-96 px-3 py-2 mb-3 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="job-title" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                </div>
            </div>
            <div>
                <label htmlFor="job-department">Department</label>
                <div>
                    <select className="w-96 px-3 py-2 mb-3 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="job-department" value={jobDepartment} onChange={(e) => setJobDepartment(e.target.value)}>
                        <option>-- Select One --</option>
                        <option>Logistics</option>
                        <option>IT & Cybersecurity</option>
                        <option>Software Development</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Copywriting</option>
                        <option>Finance</option>
                        <option>Customer Support</option>
                        <option>Design</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                        <option>Data</option>
                    </select>
                </div>
            </div>
            
            <div className="">
                <label htmlFor="worldwide">Worldwide?</label>
                    <input type="checkbox" name="worldwide" className="px-2 py-2 mb-3 mt-3 ml-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="worldwide" onChange={(e) => setWorldwide(e.target.checked)} />
            </div>
            <div className="mb-3">
                <label htmlFor="location">Remotly From</label>
                <div>
                    <Select name='location' isDisabled={worldwide} options={options} onChange={handleChange} isMulti />
                    {/* <select className="w-96 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" multiple="multiple" value={jobCountry} onChange={(e) => setJobCountry(e.target.value)}>
                        <option>Logistics</option>
                        <option>IT</option>
                        <option>Software Development</option>
                    </select> */}
                </div>
            </div>
            <div className="">
                <label htmlFor="candidate-level">Ideal Level of Candidate</label>
                <div>
                    <select name='candidate-level' className="w-96 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="job-description" rows={3} placeholder="Job Description Here..." value={candidateLevel} onChange={(e) => setCandidateLevel(e.target.value)}>
                        <option>-- Select One --</option>
                        <option>Junior</option>
                        <option>Middle</option>
                        <option>Senior</option>
                    </select>    
                </div>
            </div>
            <div className="">
                <label htmlFor="job-description">Job Description</label>
                <div>
                    <textarea className="w-96 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="job-description" rows={3} placeholder="Job Description Here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>
            </div>
            <div className="">
                <label htmlFor="company">Company</label>
                <div className="">
                    <input type="text" className="w-96 px-3 py-2 mb-3 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="company" placeholder="Company name..." value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
            </div>
            <div className="">
                <label htmlFor="company-logo">Company Logo Placeholder</label>
                <div>
                    <input type="" id="" className="w-96 px-3 py-2 mb-3 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" >
                    </input>
                </div>
            </div>
            <div className="">
                <label htmlFor="company-description">Company Description</label>
                <div>
                    <textarea className="w-96 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" id="company-description" rows={3} placeholder="Company Description Here..." value={compDescription} onChange={(e) => setCompDescription(e.target.value)} />
                </div>
            </div>
            <div className="w-96">
                <label className='' htmlFor="salary-min">Salary Range</label>
                <div className="flex flex-row justify-between w-full">
                    <input type='text' id="salary-min" className="w-24 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder='min' value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
                    <input type='text' className="w-24 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder='max' value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
                    <input type='text' className="w-24 px-3 py-2 rounded-lg mb-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder='max' value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
            </div>
            <button type="submit" className="w-96 px-3 py-2 my-12 border-2 rounded-lg shadow-sm border-indigo-500 hover:bg-indigo-500 hover:text-white focus:ring-1 focus:ring-indigo-500">Submit</button>
        </form>
        </Fragment>
    );
}
 
export default NewJob;