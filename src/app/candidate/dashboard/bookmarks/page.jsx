import { getServerSession } from "next-auth";
import { Options } from "@/app/api/auth/[...nextauth]/route";
import CandidateBookmarks from "@/app/components/candidate-bookmarks";
import Image from "next/image";



export default async function Page() {

    const session = await getServerSession(Options);

    return (
        <>
            {  session ? (
                    <div className="max-w-7xl w-screen">
                        <CandidateBookmarks session={session} />
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
