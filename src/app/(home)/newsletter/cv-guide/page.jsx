import Footer from "@/app/components/footer";
import SubscribeFormCvGuide from "@/app/components/subscribe-form-cv-guide";


export default function Page() {
  return (
    <>
        <div className="flex flex-col justify-center items-center w-full h-full mt-20">
            <SubscribeFormCvGuide />
            <Footer />
        </div>
    </>
  )
}
