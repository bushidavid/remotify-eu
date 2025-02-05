"use client";

import { Input } from '@nextui-org/react'
import Image from 'next/image';
import { useState, useEffect } from "react";
import { getUserDetails } from "../actions/actions";
import supabase from '../../../lib/config/supabaseClient';

export default function CandidateProfile({ data }) {

    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture ] = useState(null);
    const [edit, setEdit] = useState(true);
    const [updatedUser, setUpdatedUser] = useState({

    });

    console.log("logging user from user profile", user);

    useEffect(() => {

        const getUser = async () => {
          const userDetails = await getUserDetails(data?.id);
          setUser(userDetails);
          setUpdatedUser(userDetails);
        }
        
        getUser();

    }, [data?.id])

    const setProfileImage = async (e) => {

      setProfilePicture({name: e.target.name, file: e.target.files[0]});

    }

    const uploadProfileImage = async() => {
      const { data, error } = await supabase
        .storage
        .from('RemotifyProfilePictures')
        .upload(`pictures/${profilePicture.name}`, profilePicture.file, {
            cacheControl: '3600',
            upsert: true
        });

      const { data: publicURL } = await supabase
              .storage.from('RemotifyLogoImages')
              .getPublicUrl(`logos/${e.target.files[0].name}`);


      return publicURL.publicUrl || null;
    }

    const updateUser = async () => {

      const profileImageUrl = profilePicture ? await uploadProfileImage() : user.image;

      const {data, error} = await supabase
        .from('users')
        .update({
          name: updatedUser.name,
          email: updatedUser.email,
          image: profileImageUrl,
        })
        .eq('id', user.id)

        if(error){
          console.log("Error in updating user details:", error.message);
          return false;
        }

        console.log("User successfully updated");
        setUser({ ...updatedUser, image: profileImageUrl }); // Update local state
        return true;
        
    }

    const handleSave = async () => {
      
      const success = await updateUser();
      if (success) setEdit(true); 
      
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    return (
      <>
          {user ? (
          
            <div className='flex flex-col w-full justify-center items-center my-10'>
              <div className='flex flex-row w-10/12 flex-grow justify-between items-center border-b-1 border-gray-200 pb-2'>
                <h1 className='text-2xl'>Account Details</h1>
                
                {edit ? (<div><button onClick={() => setEdit(prev => !prev)} className='p-2 border-1 border-slate-200 hover:bg-slate-100'>Edit</button></div>)
                : (
                  <div className='flex flex-row gap-x-2'>
                    <button onClick={() => {setEdit(true); setUpdatedUser(user)}} className='p-2 border-1 border-slate-200 hover:bg-slate-100'>Cancel</button>
                    <button onClick={handleSave} className='p-2 border-1 border-slate-200 bg-green-200 text-green-700 hover:bg-green-300'>Save</button>
                  </div>
                  
                )}
              </div>
              
              
                <div className='flex flex-col w-full h-full text-sm gap-y-10 justify-center items-center pt-4'>
                  <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                    <div className='w-[50%]'><Image src={'/Logo.png'} width={100} height={100} className='rounded-full'/></div>
                    {!edit && 
                        <div className="flex flex-col justify-center bg-white w-[50%] h-[200px] items-center border-1 border-dashed border-zinc-700 rounded-lg">
              
                            <label htmlFor='logo'>Upload an image</label>
                            <input type='file' name="logo" onChange={(e) => (setProfileImage(e))}></input>
                      
                        </div> }
                  </div>
                  <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                    <div className='w-[50%]'>Email</div>
                    {edit ? <div className='w-[50%]'>{user?.email}</div> : <Input className="w-[50%]" type="email" variant="underlined" name="email" value={updatedUser?.email} onChange={handleChange}/>}
                  </div>
                  <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                    <div className='w-[50%]'>Your Name</div>
                    {edit ? <div className='w-[50%]'>{user?.name}</div> : <Input className="w-[50%]" type="text" variant="underlined" name="name" value={updatedUser?.name} onChange={handleChange}/>}
                  </div>
                  <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                    <div className='w-[50%]'>Password</div>
                    {edit ? <div className='w-[50%] opacity-50'>**********</div> : <div className='w-[50%]'><button className="px-2 py-2 border-1 border-slate-200" type="password" variant="underlined" name="password"  >Change password</button> </div>}
                  </div>
                </div>
              

            </div> 
          ) : (
            <div className=''>Loading...</div>
          )
          
          }
        </>
    )
}
