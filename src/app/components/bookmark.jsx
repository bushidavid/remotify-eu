"use client"

import { FaRegBookmark, FaBookmark} from "react-icons/fa";
import { deleteBookmark, isBookmarkedByUser, updateBookmark } from "../actions/actions";
import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "../../../lib/utils/supabase/client";
import Link from "next/link";

export default function Bookmark({ jobId }) {

    const [session, setSession] = useState(null);

    const [ isBookmarked, setIsBookmarked ] = useState(false);
    const [ bookmarkId, setBookmarkId ] = useState(null);

    // Fetch session only once on mount
    useEffect(() => {

        const supabase = createClient();

        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log("Couldn't retrieve user: ", error);
                return null;
            }

            setSession(data.user);

        };

        fetchSession();
    }, []);

    const getIsBookmarkedByUser = useCallback(async () => {
        if (session?.id) {
            const res = await isBookmarkedByUser(session.id, jobId);
            if (res) {
                setIsBookmarked(true);
                setBookmarkId(res.id);
            } else {
                setIsBookmarked(false);
                setBookmarkId(null);
            }
        }
    }, [session?.id, jobId]);

    useEffect(() => {
        if (session?.id) {
            getIsBookmarkedByUser();
        }
    }, [session, getIsBookmarkedByUser]);

    // useEffect(() => {
    //     if (status === "authenticated" && userId) {
    //         getIsBookmarkedByUser();
    //         console.log("logging from inside bookmarked component");
    //     }
        
    // }, [status, userId, getIsBookmarkedByUser])



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
                        <button onClick={() => {setBookmark(jobId, session?.id)}}><FaRegBookmark style={{ opacity: "50%", scale: "1.1" }} /></button>
                    )
                ) : (
                    <Link href={'/login'}><FaRegBookmark style={{ opacity: "50%", scale: "1.1" }} /></Link>
                )
            }
        </div>
    )
}
