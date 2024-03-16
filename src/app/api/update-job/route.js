import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";


const REGEX = /\[|\]/g; //REGEX to remove square brackets

const OFFSET = 50 * 24 * 60 * 60 * 1000;

const today = new Date();
today.setTime(today.getTime() + OFFSET);


export const revalidate = 0;

export async function PATCH(req, res) {

    console.log("inside update job api");

    let {oldForm, newForm} = await req.json();
    
    try {

        if(worldwide){
            jobCountry = ""
        }

        console.log(oldForm.jobCountry);
        let newCountries = newForm.jobCountry.replace('REGEX', ' ');
        let newExperience = newForm.candidateLevel.replace('REGEX', ' ');
        let newTags = newForm.tags.replace('REGEX', ' ');
        let newCountriesArray = newCountries.slice(',');
        let newExperienceArray = newExperience.slice(',');
        let newTagsArray = newTags.slice(',');

        console.log(countryArray);
    
        // updating new job
        const { data, error } = await supabase
            .from('job')
            .update({
                title: newForm.jobTitle,
                company_name: newForm.companyName,
                category_id: newForm.jobDepartment,
                worldwide: newForm.worldwide,
                salary_range_min: newForm.salaryMin,
                salary_range_max: newForm.salaryMax,
                description: newForm.jobDescription,
                company_description: newForm.compDescription,
                salary_currency: newForm.salaryCur,
                logo_url: newForm.logoUrl,
                company_website: newForm.companyWebsite, 
                job_link: newForm.jobLink
            })
            .eq('id', oldForm.id);

        if(error) {
            return NextResponse.json({message: error.message}, {status: 400})
        }


        //inserting new data into job_experience table
        const { data: experienceData, error: experienceError } = await supabase
            .rpc('update_job_experience_table', { levels: candidateLevel, job_id: oldForm.jobId});

        if(experienceError){
            console.log(experienceError);
            return NextResponse.json({message: experienceError.message}, {status: 400})
        }

        //inserting data into job_country table
        if(!worldwide){
            const oldCountries = oldForm.jobCountry.replace('REGEX', ' ');
        
        
            const { data: countryData, error: countryError } = await supabase
                .rpc('update_job_country_data', { new_countries: newCountries, old_countries: oldCountries, job_id: oldForm.jobId });

            if(countryError) {
                return NextResponse.json({message: countryError.message}, {status: 400})
            }
        }


        //inserting data into job_tags table
        const tagArray = tags.replace('REGEX', ' ');

        const { data: tagsData, error: tagsError } = await supabase
        .rpc('job_tags', { tags: tagArray, job_id: data[0].id });

        if(tagsError){
            return NextResponse.json({message: tagsError.message}, {status: 400})
        }
    
        return NextResponse.json({message: data[0].id}, {status: 200})
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    } 


    return NextResponse.json({ message: "API finished" })
}
