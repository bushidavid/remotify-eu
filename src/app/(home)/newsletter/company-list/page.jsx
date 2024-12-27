import Footer from "@/app/components/footer";
import SubscribeForm from "@/app/components/subscribe-form";


export default function Page() {
  return (
    <>
        <div className="flex flex-col justify-center items-center w-full h-full">
            <SubscribeForm />
            <Footer />
        </div>
    </>
  )
}
