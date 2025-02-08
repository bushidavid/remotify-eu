"use client"

import { FaRegBookmark, FaBookmark} from "react-icons/fa";
import { deleteBookmark, isBookmarkedByUser, updateBookmark } from "../actions/actions";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Bookmark({ jobId }) {

    const [session, setSession] = useState(null);

    const [ isBookmarked, setIsBookmarked ] = useState(false);
    const [ bookmarkId, setBookmarkId ] = useState(null);
    const userId = useMemo(() => session?.user?.id, [session?.user?.id]);

    // Fetch session only once on mount
    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
            if (sessionData && sessionData.user && sessionData.user.id) {
                getIsBookmarkedByUser(sessionData.user.id);  // Only fetch bookmark status if user is logged in
                console.log("logging from inside bookmark component");
            }
        };
        fetchSession();
    }, []);

    const getIsBookmarkedByUser = useCallback(async () => {
        if (userId) {
            const res = await isBookmarkedByUser(userId, jobId);
            if (res) {
                setIsBookmarked(true);
                setBookmarkId(res.id);
            } else {
                setIsBookmarked(false);
                setBookmarkId(null);
            }
        }
    }, [userId, jobId]);

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
                        <button onClick={() => {setBookmark(jobId, session?.user?.id)}}><FaRegBookmark style={{ opacity: "50%", scale: "1.1" }} /></button>
                    )
                ) : (
                    <button onClick={signIn}><FaRegBookmark style={{ opacity: "50%", scale: "1.1" }} /></button>
                )
            }
        </div>
    )
}
