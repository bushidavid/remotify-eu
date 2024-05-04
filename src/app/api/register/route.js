import bcrypt, { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import supabase from '../../../../lib/config/supabaseClient';

export async function POST(req){

    const body = await req.json();

    let {name, email, pwd} = body;

    if(!name || !email || !pwd) {
        return new NextResponse("Missing name, email or password", {status: 400});
    }

    try {
        const {data: user, error} = await supabase
        .from('users')
        .select('email')
        .eq('email', email)

        if(user[0]?.email == email){
            console.log("existing user found");
            return NextResponse.json({message: "User already exists", status: 409, ok: false});
        }

        if(error){
            console.log("error while looking for the user", error);
            return NextResponse.json({message: error, status: error.status, ok: false});
        }

        const hashedPassword = await bcrypt.hash(pwd, 10);

        const {error: newUserError} = await supabase
        .from('users')
        .insert({
            name: name,
            email: email,
            password: hashedPassword,
        })

        if(newUserError) {
            console.log("error creating user", newUserError);
            return NextResponse.json({message: newUserError, status: newUserError.status, ok: false})
        }else{
            console.log("user created succesfully");
            return NextResponse.json({message: "User created successfully", status: 200, ok: true})
        }
        
    } catch (err) {
        console.log(err);
        return new NextResponse({message: err}, {status: err.status})
    }

   
}