'use client';

import { Separator } from "@/components/ui/separator"
import Skill from "./skill"
import { useState } from "react";
import { skillsList } from "../../../../lib/skillsList";

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

import MultiSelect from "./multi-select";

export default function SkillsList() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedSkills, setSelectedSkills] = useState("");

    return (
      <div className='w-8/12 mb-14 border-b-slate-200 h-fit px-2'>
          <h2 className='text-xl py-2'>Skills</h2>
          <Separator />
          <div className="my-4 w-60">
              <MultiSelect
                  name="skills"
                  options={skillsList}
                  onValueChange={setSelectedSkills}
                  variant="default"
                  animation={2}
                  maxCount={4}
              />
          </div>
          <div className="flex flex-row gap-x-2  my-4">
                <Skill name={"C++"} />
          </div>
      </div>
    )
}
