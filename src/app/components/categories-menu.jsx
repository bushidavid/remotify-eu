import Link from "next/link"
import { Categories } from "../../../lib/departments"
import { handleClientScriptLoad } from "next/script"

export default function CategoriesMenu() {
  return (
   <>
        <div className={`w-40 flex absolute top-8 z-50 flex-col bg-white rounded-lg  shadow-2xl`}>
            <div className="bg-white my-2 absolute rotate-45 w-4 h-4 transform origin-center -top-[16px] place-self-center -z-50">
            </div>
        { 
                Categories.map(category => {
                    return (
                        <Link href={`/jobs/${category.value}`} key={category.id} className=" px-2 text-remotify-db hover:rounded-lg hover:bg-remotify-lum">{category.value}</Link>
                    )
                })
            }
        </div>
    </>
  )
}
