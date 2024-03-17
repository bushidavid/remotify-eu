import { Categories } from "../../../lib/departments"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";
 

  export default function CategoriesMenu () {

    const router = useRouter();

    return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          color={"default"}
          variant={"light"}
          className="text-white px-0"
        >
          Categories
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dropdown Variants"
        color={"default"} 
        variant={"light"}
      >
        {
            Categories.map(category => {
                return (
                    // <Link href={`/jobs/${category.value}`}  className=" px-2 text-remotify-db hover:rounded-lg hover:bg-remotify-lum"></Link>
                        <DropdownItem onPress={e => router.push(`/jobs/${category.value}`)} key={category.id}>{category.value}</DropdownItem>
                )
            })
        }
      </DropdownMenu>
    </Dropdown>
    )
  }

