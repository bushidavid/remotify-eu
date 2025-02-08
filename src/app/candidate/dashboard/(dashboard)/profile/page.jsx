import { createClient } from "../../../../../../lib/utils/supabase/server";
import AboutMe from "@/app/candidate/components/about-me";
import SkillsList from "@/app/candidate/components/skills-list";
import Availability from "@/app/candidate/components/availability";
import Location from "@/app/candidate/components/location";
import Languages from "@/app/candidate/components/languages";
import Roles from "@/app/candidate/components/roles";
import Benefits from "@/app/candidate/components/benefits";



export default async function Page() {

    const supabase = await createClient();

    const {data: { user }, error} = await supabase.auth.getUser();

    console.log("user", user);


    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-start overflow-y-scroll">
                <AboutMe />
                <Location />
                <Availability />
                <Roles />
                <SkillsList />
                <Languages />
                <Benefits />
            </div>
        </>
    )
}
