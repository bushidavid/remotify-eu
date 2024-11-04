"use client"

import { FaRegBookmark, FaBookmark} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { deleteBookmark, isBookmarkedByUser, updateBookmark } from "../actions/actions";
import { useState, useEffect, useCallback } from "react";

export default function Bookmark({ jobId }) {

    const {data: session, status } = useSession();

    const [ isBookmarked, setIsBookmarked ] = useState(false);
    const [ bookmarkId, setBookmarkId ] = useState(null);

    const getIsBookmarkedByUser = useCallback(async () => {
        if (session?.user?.id) {
            const res = await isBookmarkedByUser(session.user.id, jobId);
            if (res) {
                setIsBookmarked(true);
                setBookmarkId(res.id);
            } else {
                setIsBookmarked(false);
                setBookmarkId(null);
            }
        }
    }, [session?.user?.id, jobId]);

    useEffect(() => {
        if (status === "authenticated") {
            getIsBookmarkedByUser();
            console.log("logging from inside bookmarked component");
        }
        
    }, [status, getIsBookmarkedByUser])



    const setBookmark = async (jobId, userId) => {
        const response = await updateBookmark(jobId, userId);

        console.log(response);

        if(response){
            setIsBookmarked(true);
            await getIsBookmarkedByUser()
        }else{
            //add toast to display a toast message with an error that the bookmark couldn't be updated
            setIsBookmarked(false);
        }
    }

    const deleteBookmarkFromDB = async (bookmarkId) => {
        const response = await deleteBookmark(bookmarkId);

        if(response){
            setIsBookmarked(false);
            await getIsBookmarkedByUser()
        }else{
            //add toast to display a toast message with an error that the bookmark couldn't be updated
            setIsBookmarked(false);
        }
    }

    

    return (
        <div>
            {
                session ? (
                    isBookmarked ? (
                        <button onClick={() => {deleteBookmarkFromDB(bookmarkId)}}><FaBookmark style={{ opacity: "50%", scale: "1.1" }} /></button> 
                    ) : (
                        <button onClick={() => {setBookmark(jobId, session?.user?.id)}}><FaRegBookmark style={{ opacity: "50%", scale: "1.1" }} /></button>
                    )
                ) : (
                    <button onClick={signIn}><FaRegBookmark style={{ opacity: "50%", scale: "1.1" }} /></button>
                )
            }
        </div>
    )
}
