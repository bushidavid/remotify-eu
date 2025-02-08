'use client';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Check, ChevronDown } from "lucide-react";


export default function Languages() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");



    return (
        <div className='w-8/12 mb-14 border-b-slate-200 h-fit px-2'>
            <h2 className='text-xl py-2'>Languages</h2>
            <Separator />
            <div className='w-full my-4 flex flex-row gap-x-2 items-center'>
                <div>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between font-normal"
                      >
                        {value
                          ? frameworks.find((framework) => framework.value === value)?.label
                          : "Select language..."}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            
                              <CommandItem
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === "Italian" ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                Italian
                              </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a level..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Levels</SelectLabel>
                          <SelectItem value="native">Native</SelectItem>
                          <SelectItem value="bilingual">Bilingual</SelectItem>
                          <SelectItem value="fluent">Fluent</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                    </SelectGroup>
                </SelectContent>
          </Select>
        </div>
        </div>
    )
}
