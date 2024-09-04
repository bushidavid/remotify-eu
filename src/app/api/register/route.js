import bcrypt, { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import supabase from '../../../../lib/config/supabaseClient';

export async function POST(req){

    const body = await req.json();

    console.log(body)

    let {email, password} = body;

    if(!email || !password) {
        return new NextResponse({message: "Missing email or password"}, {status: 400});
    }

    try {
        const {data: user, error} = await supabase
        .from('users')
        .select()
        .eq('email', email)

        console.log(user);

        if(user.email == email){
            console.log("existing user found");
            return new NextResponse(JSON.stringify({message: "User already exists"}), {status: 409})
        }

        if(error){
            console.log("error while looking for the user", error);
            return new NextResponse({message: error}, {status: error.status})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const {error: newUserError} = await supabase
        .from('users')
        .insert({
            email: email,
            password: hashedPassword,
            role: 'company'
        })

        if(newUserError) {
            console.log("error creating user", newUserError);
            return new NextResponse({message: newUserError}, {status: newUserError.status})
        }else{
            console.log("user created succesfully");
            return new NextResponse(JSON.stringify({message: "User created successfully"}), {status: 200})
        }
        
    } catch (err) {
        console.log(err);
        return new NextResponse({message: err, status: err.status})
    }

   
}