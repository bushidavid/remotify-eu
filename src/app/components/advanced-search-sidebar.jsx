"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import MultiSelect from '../candidate/components/multi-select';
import { useState } from 'react';
import { countriesList } from '../../../lib/countriesList';
import { Categories } from '../../../lib/categoriesList';
import { Tags } from '../../../lib/tagsList';
import { FilterContext } from '../context/store';
import { useContext } from 'react';

export default function AdvancedSearch() {

    const {
        filterJobType, 
        setFilterJobType,
        filterExperience, 
        setFilterExperience
      } = useContext(FilterContext); // Destructure from context

    const [ selectedCountries, setSelectedCountries ] = useState("");
    const [ selectedTags, setSelectedTags ] = useState("");
    const [ selectedCategories, setSelectedCategories ] = useState("");
    const [ jobType, setJobType ] = useState("");
    const [ experience, setExperience ] = useState("");

    const handleChangeCountries = () => {

    }

    return (
        <div className='hidden md:block w-60 p-2 h-full sticky top-20'>
          
            <Card className="h-full">
                {/* <CardHeader className="text-center">
                    <CardTitle className="font-light">Advanced Search</CardTitle>
                </CardHeader> */}
                <Accordion type="multiple" collapsible className='w-full px-4 flex flex-col'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-light text-sm">Job Type</AccordionTrigger>
                            <AccordionContent cl className="flex flex-col gap-y-2">
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox 
                                        id="full_time" 
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterJobType([...filterJobType, "full_time"]); // Add to array
                                            } else {
                                                setFilterJobType(filterJobType.filter(type => type !== "full_time")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor="full_time"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Full time
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="part_time" 
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterJobType([...filterJobType, "part_time"]); // Add to array
                                            } else {
                                                setFilterJobType(filterJobType.filter(type => type !== "part_time")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor="part_time"
                                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Part-time
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="contract" 
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterJobType([...filterJobType, "contract"]); // Add to array
                                            } else {
                                                setFilterJobType(filterJobType.filter(type => type !== "contract")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="contract"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Contract
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="freelance" 
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterJobType([...filterJobType, "freelance"]); // Add to array
                                            } else {
                                                setFilterJobType(filterJobType.filter(type => type !== "freelance")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="freelance"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Freelance
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="internship" 
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                context.setJobType([...filterJobType, "internship"]); // Add to array
                                            } else {
                                                context.setJobType(filterJobType.filter(type => type !== "internship")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="internship"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Internship
                                        </label>
                                    </div>
                                </div>
                            </AccordionContent> 
                    </AccordionItem>
                    
                    <div className="flex flex-col gap-x-2 mt-4 items-center border-none text-left">
                        <p className='text-left text-sm font-light w-full py-2'>Remote from</p>
                        <MultiSelect
                            name="countries"
                            options={countriesList}
                            onValueChange={setSelectedCountries}
                            variant="default"
                            animation={2}
                            maxCount={4}
                        />
                        <Separator className="mt-4 mb-2" />
                    </div>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-light text-sm">Experience Level</AccordionTrigger>
                            <AccordionContent cl className="flex flex-col gap-y-2">
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="Junior" 
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterExperience([...filterExperience, "Junior"]); // Add to array
                                            } else {
                                                setFilterExperience(filterExperience.filter(type => type !== "Junior")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="Junior"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Junior
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="Junior/Mid" 
                                         onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterExperience([...filterExperience, "Junior/Mid"]); // Add to array
                                            } else {
                                                setFilterExperience(filterExperience.filter(type => type !== "Junior/Mid")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="Junior/Mid"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Junior/Mid
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="Middle" 
                                         onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterExperience([...filterExperience, "Middle"]); // Add to array
                                            } else {
                                                setFilterExperience(filterExperience.filter(type => type !== "Middle")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="Middle"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Middle
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="Mid/Senior" 
                                         onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterExperience([...filterExperience, "Mid/Senior"]); // Add to array
                                            } else {
                                                setFilterExperience(filterExperience.filter(type => type !== "Mid/Senior")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="Mid/Senior"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Mid/Senior
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-2 items-center border-none">
                                    <Checkbox id="Senior" 
                                         onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilterExperience([...filterExperience, "Senior"]); // Add to array
                                            } else {
                                                setFilterExperience(filterExperience.filter(type => type !== "Senior")); // Remove from array
                                            }
                                        }} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="Senior"
                                        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        Senior
                                        </label>
                                    </div>
                                </div>
                            </AccordionContent> 
                    </AccordionItem>
                    <div className="flex flex-col gap-x-2 items-center border-none ">
                        <p className='text-left text-sm font-light w-full pb-2 pt-4'>Categories</p>
                        <MultiSelect
                            name="categories"
                            options={Categories}
                            onValueChange={setSelectedCategories}
                            defaultValue={selectedCategories}
                            variant="default"
                            animation={2}
                            maxCount={4}
                        />
                        <Separator className="my-4" />
                    </div>

                    <div className="flex flex-col gap-x-2 items-center border-none pb-2">
                        <p className='text-left text-sm font-light w-full py-2'>Tags</p>
                        <MultiSelect
                            name="tags"
                            options={Tags}
                            onValueChange={setSelectedTags}
                            defaultValue={selectedTags}
                            variant="default"
                            animation={2}
                            maxCount={4}
                        />
                    </div>

                </Accordion>
            </Card>

        </div>
    )
        
      
}
