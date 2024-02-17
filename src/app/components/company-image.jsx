import Image from "next/image"

export default function CompanyImage({ profImage, name }) {

    const initials = name.substring(0, 2).toUpperCase();

  return (
    <div>
        { profImage ? (
            <Image src={session.user.image} className=" rounded-full " width={60} height={60} alt={session.user.name}></Image> 
            ) : (
                <div className="flex justify-center items-center rounded-full w-[60px] h-[60px] bg-gray-200 text-4xl text-gray-500" >{initials}</div>
            )
        }
    </div>
  )
}
