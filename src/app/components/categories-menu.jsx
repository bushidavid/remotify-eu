import Link from "next/link"
import { Categories } from "../../../lib/departments"

export default function CategoriesMenu() {
  return (
   <>
        <div className={`w-40 flex absolute mt-6 z-50 flex-col bg-white rounded-lg top-2 shadow-2xl`}>
            <div className="bg-white my-2 absolute rotate-45 w-4 h-4 transform origin-center -top-[16px] place-self-center -z-50">
            </div>
        { 
                Categories.map(category => {
                    return (
                        <Link href="/" key={category.id} className=" px-2 text-remotify-db hover:bg-slate-200 hover:rounded-lg">{category.value}</Link>
                    )
                })
            }
        </div>
    </>
  )
}
