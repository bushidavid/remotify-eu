import CandidateProfile from "@/app/components/candidate-profile";
import { createClient } from "../../../../../../lib/utils/supabase/server";



export default async function Page() {

    const supabase = await createClient();

    const {data: { user }, error} = await supabase.auth.getUser();

    console.log("user", user);


    return (
        <>
            <div className="w-full">
                <CandidateProfile data={user} />
            </div>
        </>
    )
}
