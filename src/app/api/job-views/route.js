import { NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";

export async function PATCH(req){

    let { jobId } = await req.json();

    try {
  
        const {data: job, error} = await supabase.rpc('get_jobs_details_v3', { jobid: jobId });

        if(error){
            console.log(error);
            return NextResponse.json({message: error,message, hint: error.hint, status: error.code, ok: false})
        }
      
        const { views } = job[0];

        const { data: insertData, error: insertError } = await supabase
            .from('job')
            .update({
                views: views + 1,
            })
            .eq('id', jobId);
        
        if(insertError) return  NextResponse.json({message: insertError.message, status: insertError.code, hint: insertError.hint});
        
        return  NextResponse.json({message: `successfully updated job views for jobId: ${jobId}`, status: 200, ok: true});
    
      } catch (error) {
        console.error(error);
        return  NextResponse.json({message: error.message, status: 500, ok: false})
        
      }
}