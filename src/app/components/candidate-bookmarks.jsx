"use client";

import { useState, useEffect } from "react";
import { deleteBookmark, getCandidateBookmarks } from "../actions/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const options = {
    "year" : "numeric",
    "month": "short",
    "day": "numeric"
}

export default function CandidateBookmarks({ session }) {

    const router = useRouter();

    const [bookmarks, setBookmarks ] = useState([]);

    const handleDeleteBookmark = async (bookmarkId) => {

        const res = await deleteBookmark(bookmarkId);

        if(res){
            await getCandidateBookmarkedJobs()
        }

       //trigger toast
    }

    const getCandidateBookmarkedJobs = async () => {
        const candidateBookmarkedJobs = await getCandidateBookmarks(session?.user?.id);
        setBookmarks(candidateBookmarkedJobs);
    }

    useEffect(() => {
        getCandidateBookmarkedJobs();
    }, [session?.user?.id]);

    

    return (
        <section className='flex flex-col w-full items-center justify-center'>
            { bookmarks.length > 0 ?
                (
                <>
                    <h1 className="text-center text-4xl mt-4">All Your Bookmarked Jobs</h1>
                    <ul role="list" className="divide-y divide-gray-100 w-10/12">
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.job.id} className="flex justify-between items-center gap-x-6 py-5">
                            <div className="flex flex-col min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <Link href={`/company/dashboard/viewjob/${bookmark.job.id}`} className={`text-sm font-semibold leading-6 ${bookmark.job.expired ? "text-gray-400" : "text-gray-900"}`}>{bookmark.job.expired ? bookmark.job.title  + " - Expired" : bookmark.job.title}</Link>
                                </div>
                                <div className="sm:flex">
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Posted {new Date(bookmark.job.created_at).toLocaleString(undefined, options)}
                                    </p>
                                </div>
                            </div>


                            <div className="inline-flex h-8 rounded-md shadow-sm " role="group">
                            <button onClick={() => router.push(`/job/${bookmark.job.id}/`)} type="button" className="px-4 py-0.5 text-xs text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 ">
                                    View
                                </button>
                                <button type="button" onClick={() => handleDeleteBookmark(bookmark.id)} className="px-4 py-0.5 text-xs  border border-gray-200 rounded-e-lg hover:bg-gray-100   ">
                                    <FontAwesomeIcon icon={faBookmark} />
                                </button>

                            </div>
                        </li>
                    ))}
                    </ul>
                </>
                ) : (
                    <div>
                        <h1>No bookmarks yet. Please go back to the homepage to bookmark your favourite jobs.</h1>
                    </div>
                )
        }
        </section>
    )
}
