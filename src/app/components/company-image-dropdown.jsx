import Link from "next/link";
import { signOut } from "next-auth/react";

export default function CompanyImageDropdown() {
  return (
    <>
        <div className={`w-40 flex absolute top-8 z-50 flex-col bg-white rounded-lg  shadow-2xl text-black`}>
            <div className="bg-white my-2 absolute rotate-45 w-4 h-4 transform origin-center -top-[16px] place-self-center -z-50">
            </div>
                <Link href={'/company/abc/dashboard'} >Dashboard</Link>
                <Link href={'/company/abc/account'} >Account </Link>
                <Link href={'/company/abc/jobs'} >Jobs</Link>
                <Link href="/api/auth/signout" onClick={e => {
                        e.preventDefault();
                        signOut();
                    }}>Sign Out</Link>
                
        </div>
    </>
  )
}
