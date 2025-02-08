'use client';

import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { createClient } from '../../../lib/utils/supabase/client';




function SignInProviders() {

    const supabase = createClient();

    const handleSignIn = async () => {

        try {

           console.log("handle sign in");
            const { data: user, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: '/'
                  }
              })
            
              
            if(error) throw error;
            return user;
        } catch (error) {
            console.log("Error during Google sign in: ", error);
            return null;
        }
    }

  return (
    <div className="h-[30%] md:h-full flex flex-col ">
        <button className="flex flex-row w-full text-xs md:text-sm md:w-96 justify-center items-center gap-x-2 md:gap-x-4 mt-2 md:mt-10 bg-white shadow-md hover:shadow-xl transition-shadow border-1 border-slate-200 px-10 py-4 rounded-md" onClick={handleSignIn}><FcGoogle size={30}/> Sign In with Google</button>
        {/* <button className="flex flex-row justify-center items-center gap-x-4 w-96  mt-10 bg-white shadow-md hover:shadow-xl transition-shadow border-1 border-slate-200 px-10 py-4 rounded-md" onClick={() => signIn('linkedin', {callbackUrl: callBackUrl})}> <FaLinkedin size={50} color='#0e76a8'/> Sign up with LinkedIn </button> */}
    </div>
  )
}

export default SignInProviders