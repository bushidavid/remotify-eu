import { NextResponse } from "next/server";
import supabase from "../../../../lib/config/supabaseClient";


export async function GET(req){

    try {

        const data = await supabase.from('country').select();

        

        const countries = data.map((country) => {
            const transformBigIntToString = (key, value) => {
              return typeof value === 'bigint' 
                ? value.toString() 
                : value;
            };
          
            // Use JSON.parse and JSON.stringify to apply the transformation
            return JSON.parse(JSON.stringify(country, transformBigIntToString));
        })


        return  NextResponse.json({ countries: countries }, { status: 200 });


    } catch (error) {
        return {"message" : "there was an error"}
    }

}