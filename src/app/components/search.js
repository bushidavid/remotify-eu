'use client';

import { useState } from 'react';
import supabase from "../../../lib/config/supabaseClient";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import { useEffect } from "react";
import { FilterContext } from "../context/store";
import { useContext } from 'react';


export default function Search() {
    
  const context = useContext(FilterContext);

  return (
    <>
        <form className="flex flex-col w-11/12 max-w-7xl md:w-8/12 justify-around align-center border border-slate-200 rounded-2xl px-4 py-5 my-5">
          <div className="flex flex-grow flex-row w-full">
              <input placeholder="Search for a job" className="border-1 border-remotify-db w-10/12 rounded-lg py-2 px-2 my-2 outline-none" value={context.title} onChange={e => context.setTitle(e.target.value)}></input>
              <CheckboxGroup
                orientation="horizontal"
                color="primary"
                classNames={{
                  base: "w-6/12 mx-2 flex justify-center items-center text-xs"
                }}
                
                onValueChange={context.setFilter}
              >
                  <Checkbox value="full_time" name='fullTime'>Full Time</Checkbox>
                  <Checkbox value="part_time" name='partTime'>Part Time</Checkbox>
              </CheckboxGroup>
            </div>
            {/* <div className="flex flex-grow flex-wrap justify-center items-center mt-3 border-t-1 pt-5 border-slate-100">
              <CheckboxGroup
                orientation="horizontal"
                color="primary"
                classNames={{
                  base: "w-8/12 mx-2 flex"
                }}
                
                onValueChange={context.setFilter}
              >
                  <Checkbox value="programming" name='programming'>Programming</Checkbox>
                  <Checkbox value="design" name='design'>Design</Checkbox>
                  <Checkbox value="fullyRemote" name='fullyRemote'>Fully Remote</Checkbox>
                  <Checkbox value="hybrid" name='hybrid'>Hybrid</Checkbox>
                  <Checkbox value="stipend" name='stipend'>Stipend</Checkbox>
              </CheckboxGroup>
            </div> */}
        </form>
    </>
  )
}