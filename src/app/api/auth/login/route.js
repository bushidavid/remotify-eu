import { NextResponse } from "next/server";
import { createClient } from "../../../../../lib/utils/supabase/client";

export async function POST(req) {

    const supabase = createClient();

    const {email, password} = await req.json();

    console.log("logging data", email, password);

    try {

        console.log("supabase auth: ", supabase.auth);
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })

        if(error) throw error;
        return NextResponse.json({ok: true, message: "User logged in succesfully"});
    } catch (error) {
        console.log("Error during sign in:", error);
        return NextResponse.json({ok: false, message: error});
    }
}