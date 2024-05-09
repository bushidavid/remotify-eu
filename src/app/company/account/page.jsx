'use client';

import React, { useEffect, useState } from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { Countries } from '../../../../lib/countries';
import { useSession } from 'next-auth/react';
import { getUserDetails } from '@/app/actions/actions';
import { useEditor } from '@tiptap/react';
import Image from 'next/image';
import { resetPassword } from '@/app/actions/actions';
import supabase from '../../../../lib/config/supabaseClient';

export default function Page() {

  const { data: session, status } = useSession({
    required: true,
  })

  console.log(status);

  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser ] = useState();
  const [edit, setEdit] = useState(true);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [country, setCountry] = React.useState(new Set([]));

  useEffect(() => {

    const getUser = async () => {
      const userDetails = await getUserDetails(session?.user?.id);


      setUser({
        name: userDetails?.name,
        email: userDetails?.email,
        zip: userDetails?.zip,
        city: userDetails?.city,
        address_line1: userDetails?.address_line1,
        address_line2: userDetails?.address_line2,
        id: userDetails?.id
      });

      setUpdatedUser({
        name: userDetails?.name,
        email: userDetails?.email,
        zip: userDetails?.zip,
        city: userDetails?.city,
        address_line1: userDetails?.address_line1,
        address_line2: userDetails?.address_line2,
        id: userDetails?.id
      });

    }
    
    getUser();

  }, [session?.user?.id])

    const handleChangePasswordClick = async (e) => {

      e.preventDefault();


      const result = await resetPassword(user?.email);

      if(result.ok){
        setResetPasswordSuccess(true);
      }

      return;
      
    }
  
    const handleChangeUser = (e) => {

      console.log(e.target.name, e.target.value);

      setUpdatedUser({
        ...updatedUser, 
        [e.target.name]: e.target.value
      })

      console.log(updatedUser);
    }

    const handleSaveClick = async () => {
      const {data, error} = await supabase
        .from("users")
        .update({
          name: updatedUser.name, 
          address_line1: updatedUser.address_line1,
          address_line2: updatedUser.address_line2,
          city: updatedUser.city,
          zip: updatedUser.zip,
          country_id: parseInt(updatedUser.country)
        })
        .eq('id', user.id)
        .select();

        if(data){
          console.log(data);
          setEdit(true);
        }
    }

    const handleCancel = (e) => {
      e.preventDefault();

      setEdit(prev => !prev);
      setUpdatedUser({
        ...user
      })

    }
  


  return (
      <>
        { (session && user) ? 
        (
        <div className='flex flex-col w-full justify-center items-center my-10'>
          <div className='flex flex-row w-10/12 flex-grow justify-between items-center border-b-1 border-gray-200 pb-2'>
            <div><h1 className='text-2xl'>Account Details</h1></div> 
            {edit ? (<div><button onClick={() => setEdit(prev => !prev)} className='p-2 border-1 border-slate-200 hover:bg-slate-100'>Edit</button></div>)
            : (
              <div className='flex flex-row gap-x-2'>
                <button onClick={handleCancel} className='p-2 border-1 border-slate-200 hover:bg-slate-100'>Cancel</button>
                <button type="submit" form="user" className='p-2 border-1 border-slate-200 bg-green-200 text-green-700 hover:bg-green-300'>Save</button>
              </div>
              
            )}
          </div>
          <form onSubmit={handleSaveClick} id="user" className='flex flex-col w-full h-full text-sm gap-y-10 justify-center items-center pt-4'>
            <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
              <div className='w-[50%]'>Email</div>
              {edit ? <div className='w-[50%]'>{updatedUser?.email}</div> : <Input onChange={handleChangeUser} className="w-[50%]" type="email" variant="underlined" name="email" value={updatedUser?.email} isRequired />}
            </div>
            <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
              <div className='w-[50%]'>Company Name</div>
              {edit ? <div className='w-[50%]'>{updatedUser?.name}</div> : <Input onChange={handleChangeUser} className="w-[50%]" type="text" variant="underlined" name="name" value={updatedUser?.name} isRequired />}
            </div>
            <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
              <div className='w-[50%]'>Password</div>
              {edit ? 
                <div className='w-[50%] opacity-50'>**********</div> 
                : 
                !resetPasswordSuccess ? <div className='w-[50%]'><button onClick={handleChangePasswordClick} className="px-2 py-2 border-1 border-slate-200" type="password" name="password"  >Change password</button> </div> : <div className='w-[50%]'><p>We&apos;ve sent a reset link to your email.</p></div>}
            </div>
            <div className={`flex flex-col md:flex-row w-10/12 justify-center ${ edit ? 'items-center' : 'items-start'}`}>
              <div className='w-[50%]'>Billing Address</div>
              {edit ? 
                (
                  <div className='w-[50%] opacity-50'>{updatedUser?.address_line1 + `, ` + updatedUser?.address_line2 + `, ` + updatedUser?.city + ', ' + updatedUser?.zip}</div>
                )
               : 
               (
                <div className='flex flex-col w-[50%]'>
                  <Input onChange={handleChangeUser} className="" type="text" variant="underlined" label={'Address Line 1'} name="address_line1" value={updatedUser?.address_line1} />
                  <Input onChange={handleChangeUser} className="" type="text" variant="underlined" label={'Address Line 2'} name="address_line2" value={updatedUser?.address_line2} />
                  <div className='w-full flex flex-row gap-4'>
                    <Input onChange={handleChangeUser} className="w-[50%]" type="text" variant="underlined" label={'City'} name="city" value={updatedUser?.city} />
                    <Input onChange={handleChangeUser} className="w-[50%]" type="text" variant="underlined" label={'ZIP'} name="zip" value={updatedUser?.zip} />
                  </div>
                    <Select label="Country"
                        selectedKeys={updatedUser?.country}
                        placeholder="Select Country"
                        variant="underlined"
                        className=""
                        onChange={handleChangeUser}
                        name="country"
                    >   
                        {
                            Countries.map(country => (

                                <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                            ))
                        }
                    </Select>
              </div>
                
                )
               }
            </div>
          </form>

        </div>
        )
        :
        (
          <div className='flex items-center justify-center'>
            <Image src={'/loading.svg'} width={300} height={300} alt='loading_svg'></Image>
          </div>
        )
        }
      </>
  )
}
