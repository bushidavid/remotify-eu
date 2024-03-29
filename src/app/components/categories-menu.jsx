import { Categories } from "../../../lib/departments"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";
 

  export default function CategoriesMenu () {

    const router = useRouter();

    return (
    <Dropdown className="mx-0">
      <DropdownTrigger className="px-0">
        <Button 
          disableRipple
          color={"default"}
          variant={"light"}
          className="p-0  data-[hover=true]:bg-transparent"
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

