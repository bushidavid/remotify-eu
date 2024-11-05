import bcrypt, { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import supabase from '../../../../lib/config/supabaseClient';

export async function POST(req){

    const body = await req.json();

    let {name, surname, email, password, userType} = body.data;


    if(!email || !password) {
        return new NextResponse({message: "Missing email or password"}, {status: 400});
    }

    try {
        const {data: user, error} = await supabase
        .from('users')
        .select()
        .eq('email', email)


        if (user && user.length > 0) {
            console.log("Existing user found");
            return NextResponse.json({ message: "User already exists", status: 409, ok: false });
        }

        if(error){
            console.log("error while looking for the user", error);
            return NextResponse.json({message: error, status: error.status, ok: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const {error: newUserError} = await supabase
        .from('users')
        .insert({
            name: name,
            last_name: surname,
            email: email,
            password: hashedPassword,
            role: userType
        })

        if(newUserError) {
            console.log("error creating user", newUserError);
            return NextResponse.json({message: newUserError, status: newUserError.status, ok: false});
        }else{
            console.log("user created succesfully");
            return NextResponse.json({message: "User successfully created", status: 200, ok: true});
        }
        
    } catch (err) {
        console.log(err);
        return new NextResponse({message: err, status: err.status})
    }

   
}