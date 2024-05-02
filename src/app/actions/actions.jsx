'use server'

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import supabase from "../../../lib/config/supabaseClient";

var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var currentTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

export async function fetchJobs(limit = 24, lastLoadedTime = currentTime, search = "", filter = ""){

    console.log(search);

    const { data, error } = await supabase.rpc('get_jobs_v4', {loadlimit: limit, lastloadedtime: lastLoadedTime, p_category: search, p_search: filter});

    if(error){
        console.log(error);
    }

    const result = data.map((job) => {
        const transformBigIntToString = (key, value) => {
        return typeof value === 'bigint' 
            ? value.toString() 
            : value;
        };
    
    
        // Use JSON.parse and JSON.stringify to apply the transformation
        return JSON.parse(JSON.stringify(job, transformBigIntToString));
    })

    revalidatePath("/");

    return result;
};


import { sendgridClient } from "../../../lib/email";


export async function sendEmail(form){


    const msgToProspect = {
        to: form.customerEmail,
        bcc: 'sales@remotifyeurope.com',
        from: {
            email: 'sales@remotifyeurope.com',
            name: 'Sales at RemotifyEurope'
        },
        templateId: 'd-b23da83288054da1b24e05e31ccd7590',
        dynamicTemplateData: {
          user_message: form.customerMessage,
          user_name: form.customerName,
          user_subject: form.customerSubject
        },
    };

    // const msg = {
    //     to: 'sales@remotifyeurope.com', // Change to your recipient
    //     from: 'sales@remotifyeurope.com', // Change to your verified sender
    //     subject: form.customerSubject,
    //     text: `${form.customerName}, your contact request was sent`,
    //     html: `You have a new message from ${form.customerName}, email: ${form.customerEmail} saying: <br>
    //         ${form.customerMessage}
    //     `
    // }

    // sendgridClient.send(msg)
    //     .then(() => {
    //         console.log("Message to David sent successfully");
    //         return true;
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         return false;
    //     })

    sendgridClient.send(msgToProspect)
        .then(() => {
            console.log("Message to prospect sent successfully");
            return true;
        })
        .catch((error) => {
            console.error(error);
            return false;
        })
}

async function getCompanyData(companyId) {
    
    const {data, error} = await supabase
        .from('company')
        .select('id')
        .eq(companyId)

    console.log(data);

    if(error) {
        console.log("error fetching data from DB");
    }

    return data;
}

export async function getCompanyJobs(limit = 24, lastLoadedTime = currentTime, companyId) {
    
    const {data, error} = await supabase.rpc('get_company_jobs_v1', {loadlimit: limit, lastloadedtime: lastLoadedTime, p_companyid: companyId})


    if(error) {
        console.log("error fetching data from DB", error);
        return {};
    }

    return data;
}

export async function getCompanyStats(companyId) {

    console.log("inside server action stats");
    console.log(companyId);

    try {
        const {data: stats, error} = await supabase.rpc('get_company_stats', { companyid: companyId });
        console.log(stats);
        console.log(error);
        return stats[0];
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}


// fetch job details from database
export async function getJobDetails(jobId){
    try {
  
      const {data: job, error} = await supabase.rpc('get_jobs_details_v3', { jobid: jobId });
    
      
    //   const transformBigIntToString = (key, value) => {
    //       return typeof value === 'bigint' 
    //         ? value.toString() 
    //         : value;
    //     }
      
    //     // Use JSON.parse and JSON.stringify to apply the transformation
    //   const data = JSON.parse(JSON.stringify(job, transformBigIntToString));
        revalidatePath("/")
        return job[0];
  
    } catch (error) {
      console.log(error);
      return null;
    }

    
}


// fetch job details from database
export async function getUserDetails(userId){
    try {
  
      const {data: user, error} = await supabase
      .from('users')
      .select('*')
      .eq('id', userId);

      console.log("loggin user from backend", user);
    
      
    if(error){
        console.log(error);
    }
      
      return user[0];
  
    } catch (error) {
      console.log(error);
      return null;
    }
}

export async function updateJobClicks(jobId){
    try {
  
        const {data: job, error} = await supabase.rpc('get_jobs_details_v3', { jobid: jobId });

        if(error){
            console.log(error);
            return false;
        }
      
        const { clicks } = job[0];

        const { data: insertData, error: insertError } = await supabase
            .from('job')
            .update({
                clicks: clicks + 1,
            })
            .eq('id', jobId)
            .select();
        
        if(insertError) {
            console.log(insertError);
            return false;
        }
        
        revalidatePath("/");
        
        return true;
    
      } catch (error) {
        console.log(error);
        return false;
      }
}


