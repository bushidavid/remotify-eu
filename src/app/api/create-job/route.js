import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";
import { Wire_One } from "next/font/google";

const REGEX = /\[|\]/g; //REGEX to remove square brackets

const OFFSET = 50 * 24 * 60 * 60 * 1000;

const today = new Date();
today.setTime(today.getTime() + OFFSET);


export const revalidate = 0;

export async function POST(req, res) {
    
    try {

        let {
            jobTitle,
            jobDepartment,
            jobDescription,
            jobCountry,
            tags,
            companyName,
            compDescription,
            candidateLevel,
            worldwide,
            salaryMin,
            salaryMax,
            salaryCur,
            logoUrl,
        } = await req.json();


        if(worldwide){
            jobCountry = ""
        }
    
        //creating new job
        const { data, error } = await supabase
            .from('job')
            .insert({
                title : jobTitle,
                company_name: companyName,
                category_id: jobDepartment,
                worldwide,
                expired: false,
                salary_range_min: salaryMin,
                salary_range_max: salaryMax,
                views: 0, 
                clicks: 0,
                description: jobDescription,
                company_description: compDescription,
                salary_currency: salaryCur,
                logo_url: logoUrl,
                expiration_date: today.toISOString().toLocaleString('de-DE'),
            })
            .select();

        if(error) {
            return NextResponse.json({message: error.message}, {status: 400})
        }

        //inserting data into job_experience table
        const { data: experienceData, error: experienceError } = await supabase
            .rpc('populate_job_experience_table', { levels: candidateLevel, job_id: data[0].id });

        if(experienceError){
            console.log(experienceError);
            return NextResponse.json({message: experienceError.message}, {status: 400})
        }

        //inserting data into job_country table
        if(!worldwide){
            const countries = jobCountry.replace('REGEX', ' ');
        
        
            const { data: countryData, error: countryError } = await supabase
                .rpc('populate_job_country_table', { countries: countries, job_id: data[0].id });

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
    
        return NextResponse.json({message: "new job created successfully"}, {status: 200})
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    } 
}
