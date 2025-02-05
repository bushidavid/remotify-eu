import CandidateBookmarks from "@/app/components/candidate-bookmarks";
import Image from "next/image";
import { createClient } from "../../../../../../lib/utils/supabase/server";



export default async function Page() {

    const supabase = await createClient();

    const {data: { user }, error} = await supabase.auth.getUser();

    return (
        <>
            {  user ? (
                    <div className="max-w-7xl w-screen">
                        <CandidateBookmarks user={user} />
                    </div>

                ) : (
                    <div className='flex items-center justify-center w-screen'>
                        <Image src={'/loading.svg'} width={300} height={300} alt='loading_svg'></Image>
                    </div>
                )
            }
        </>
    )
}
