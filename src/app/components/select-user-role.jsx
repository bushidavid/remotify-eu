'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import supabase from "../../../lib/config/supabaseClient";

// Zod schema for validation
const UserTypeSchema = z.object({
    userType: z.enum(["candidate", "company"], {
        required_error: "Please select a user type before signing in.",
    }),
});



export default function SelectUserRole() {

    const { handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(UserTypeSchema),
        defaultValues: {
            userType: "candidate",
        },
      });

    const userType = watch("userType"); // Watch userType to manage checkbox selection

    // Handle checkbox change to ensure only one can be selected
    const handleCheckboxChange = (type) => {
        setValue("userType", userType === type ? "" : type);
    };

    const onSubmit = async (data) => {

        const { data: user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                role: data.userType
            }
        })
    }

    return (
        <div className="flex flex-col items-center">
                {/* User Type Selection with Checkboxes */}
                <form onSubmit={handleSubmit((data) => onSubmit(data, "google"))}>
                    <div className="w-full gap-x-2 flex flex-row justify-center">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={userType === "candidate"}
                                onCheckedChange={() => handleCheckboxChange("candidate")}
                                id="candidate-checkbox"
                            />
                            <label htmlFor="candidate-checkbox" className="text-sm font-regular">
                                Sign up as Candidate
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={userType === "company"}
                                onCheckedChange={() => handleCheckboxChange("company")}
                                id="company-checkbox"
                            />
                            <label htmlFor="company-checkbox" className="text-sm font-regular">
                                Sign up as Company
                            </label>
                        </div>
                        {errors.userType && (
                            <p className="text-red-500 text-sm mt-2">{errors.userType.message}</p>
                        )}
                    </div>

                    {/* OAuth Sign-in Buttons */}
                    <div className="space-y-2">
                        <button type="submit" className="flex flex-row w-full text-xs md:w-96 justify-center items-center gap-x-2 md:gap-x-4 mt-2 md:mt-10 bg-white shadow-md hover:shadow-xl transition-shadow border-1 border-slate-200 px-10 py-4 rounded-md" >
                            <FcGoogle size={30}/>
                            Sign In with Google
                        </button>
                        {/* <Button type="button" onClick={handleSubmit((data) => onSubmit(data, "linkedin"))}>
                            Sign in with LinkedIn
                        </Button> */}
                    </div>
                </form>
            </div>
    )
}
