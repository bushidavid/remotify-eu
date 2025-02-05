'use client';

import React, { useEffect, useState } from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { Countries } from '../../../../lib/countries';
import { createClient } from '../../../../lib/utils/supabase/client';
import Image from 'next/image';

export default function Page() {

    const [user, setUser] = useState(null);

    const [edit, setEdit] = useState(true);

    useEffect(() => {

      const getUser = async () => {

        const supabase = await createClient();
        
        const userDetails = await supabase.auth.getUser();
        setUser(userDetails);
      }
      
      getUser();

    }, [])
  
    return (
        <>
          { user ? 
          (
          <div className='flex flex-col w-full justify-center items-center my-10'>
            <div className='flex flex-row w-10/12 flex-grow justify-between items-center border-b-1 border-gray-200 pb-2'>
              <div><h1 className='text-2xl'>Account Details</h1></div> 
              {edit ? (<div><button onClick={() => setEdit(prev => !prev)} className='p-2 border-1 border-slate-200 hover:bg-slate-100'>Edit</button></div>)
              : (
                <div className='flex flex-row gap-x-2'>
                  <button onClick={() => setEdit(prev => !prev)} className='p-2 border-1 border-slate-200 hover:bg-slate-100'>Cancel</button>
                  <button className='p-2 border-1 border-slate-200 bg-green-200 text-green-700 hover:bg-green-300'>Save</button>
                </div>
                
              )}
            </div>
            <div className='flex flex-col w-full h-full text-sm gap-y-10 justify-center items-center pt-4'>
              <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                <div className='w-[50%]'>Email</div>
                {edit ? <div className='w-[50%]'>{user?.email}</div> : <Input className="w-[50%]" type="email" variant="underlined" name="email" value={user?.email} />}
              </div>
              <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                <div className='w-[50%]'>Company Name</div>
                {edit ? <div className='w-[50%]'>{user?.name}</div> : <Input className="w-[50%]" type="text" variant="underlined" name="name" value={user?.name} />}
              </div>
              <div className='flex flex-col md:flex-row w-10/12 items-center justify-center'>
                <div className='w-[50%]'>Password</div>
                {edit ? <div className='w-[50%] opacity-50'>**********</div> : <div className='w-[50%]'><button className="px-2 py-2 border-1 border-slate-200" type="password" variant="underlined" name="password"  >Change password</button> </div>}
              </div>
              <div className={`flex flex-col md:flex-row w-10/12 justify-center ${ edit ? 'items-center' : 'items-start'}`}>
                <div className='w-[50%]'>Billing Address</div>
                {edit ? 
                  (
                    <div className='w-[50%] opacity-50'>{user?.address_line1 + `, ` + user?.address_line2 + `, ` + user?.city + ', ' + user?.zip}</div>
                  )
                : 
                (
                  <div className='flex flex-col w-[50%]'>
                    <Input className="" type="text" variant="underlined" label={'Address Line 1'} name="address1" value={user?.address_line1} />
                    <Input className="" type="text" variant="underlined" label={'Address Line 2'} name="address2" value={user?.address_line2} />
                    <div className='w-full flex flex-row gap-4'>
                      <Input className="w-[50%]" type="text" variant="underlined" label={'City'} name="city" value={user?.city} />
                      <Input className="w-[50%]" type="text" variant="underlined" label={'ZIP'} name="zip" value={user?.zip} />
                    </div>
                      <Select label="Country"
                          
                          placeholder="Select Country"
                          variant="underlined"
                          className=""
                          //selectedKeys={selectedCountry}
                          //onChange={handleSelectionChangeCountry}
                          //isRequired={!form.worldwide}
                          name="jobCountry"
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
            </div>

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
