'use client';

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
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

export default function Roles() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className='w-8/12 mb-14 border-b-slate-200 h-fit px-2'>
            <h2 className='text-xl py-2'>What roles are you looking for? </h2>
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
                          : "Select role..."}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search role..." />
                        <CommandList>
                          <CommandEmpty>No role found.</CommandEmpty>
                          <CommandGroup>
                            
                              <CommandItem
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === "Italian" ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                Software Developer
                              </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
        </div>
        </div>
    )
}
