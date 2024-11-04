import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";


// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



export async function PATCH(req, res) {
    
    try {

        let {
            id
        } = await req.json();

       const {data, error} = await supabase
        .from('job')
        .update({expiration_date: getTodayDate(), expired: true})
        .eq('id', id)
    
        if(error) {
            return NextResponse.json({message: error.message}, {status: error.status})
        }
        
    
        return NextResponse.json({message: 'job closed successfully'}, {status: 200})
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    } 
}
