import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";

export async function DELETE(req, res) {
    
    try {

        let {
            id
        } = await req.json();

       const {error} = await supabase
        .from('job')
        .delete()
        .eq('id', id)
    
        if(error) {
            return NextResponse.json({message: error.message}, {status: 400})
        }
        
    
        return NextResponse.json({message: 'job deleted successfully'}, {status: 200})
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    } 
}
