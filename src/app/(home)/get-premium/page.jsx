import Footer from "../../components/footer";
import SubscriptionCard from "../../components/subscription-card";
import SubscriptionFeature from "../../components/subscription-feature";
import { faBell, faAward, faMagnifyingGlass, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import SubscriptionStats from "../../components/subscription-stats";
import Image from "next/image";
import Link from "next/link";


export const metadata = {
    title: 'RemotifyEurope - Get Premium',
    description: 'Find the best remote jobs in Europe',
    openGraph: {
      title: 'RemotifyEurope - Get Premium',
      description: 'Find the best remote jobs in Europe',
      images: [
        '/Logo.jpg' // Path to the Open Graph image in your public directory
      ],
    },
  }


const getSubscriptions = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-subscriptions`, {
            next: { revalidate: 0 },
        });
        
        // Check if response is okay and JSON format
        if (!res.ok) {
            throw new Error(`Failed to fetch subscriptions: ${res.statusText}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return null; // or some fallback data if needed
    }
}

export default async function Page() {

    if(!process.env.NEXT_PUBLIC_BASE_URL){
        return null;
    }

    const prices = await getSubscriptions();

    return (
        <>
            { prices ? 
                (
                <div className="w-screen flex flex-col items-center relative ">
                    <div id="top" className="h-[1150px] md:h-[350px] flex w-full flex-col items-center bg-remotify-db">
                        <h1 className="w-10/12 md:w-full text-center text-white text-xl md:text-3xl pt-4 md:pt-10 pb-4 ">Get access to our premium database of remote jobs</h1>
                        <h2 className="w-10/12 md:w-full text-center text-slate-300 text-xs md:text-sm mb-10">Our extensive network includes job openings from leading remote companies</h2>
                    </div>
                    <div className="h-[600px] md:h-[350px] flex w-full flex-col items-center bg-slate-200">
                        <div className="flex flex-wrap md:flex-nowrap justify-center md:flex-row gap-x-6 w-full md:w-8/12 relative top-[100px] md:top-[150px]">
                            <SubscriptionFeature icon={faBell} title={"Instant Job Alerts"} description={"Receive personalized email job notification to be first to apply"}/>
                            <SubscriptionFeature icon={faAward} title={"Quality Above All"} description={"High-quality and vetted job postings directly to your inbox"}/>
                            <SubscriptionFeature icon={faMagnifyingGlass} title={"Improved Search"} description={"Sort through jobs with tagged categorization, skills, and location"}/>
                            <SubscriptionFeature icon={faCalendarDays} title={"Cancel Anytime"} description={"Cancel your plan anytime"}/>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-y-2 md:gap-x-2 md:w-10/12 items-center md:justify-center max-w-7xl  rounded-lg absolute top-[150px]">
                        <SubscriptionCard title={"Monthly Subscription"} reoccurrence={"Billed monthly"} price={prices.prices[0]?.unit_amount} cadence={"per month"} comment={""} className={""} id={prices.prices[0]?.id}/>
                        <SubscriptionCard title={"Quarterly Subscription"} reoccurrence={"Billed every 3 months"} price={prices.prices[1]?.unit_amount} cadence={"per quarter"} comment={"Only €5.33 per month"} className={"bg-cyan-50"} id={prices.prices[1]?.id}/>
                        <SubscriptionCard title={"Annual Subscription"} reoccurrence={"Billed yearly"} price={prices.prices[2]?.unit_amount} cadence={"per year"} comment={"Only €4.15 per month"} className={""} id={prices.prices[2]?.id}/>
                    </div>
                    <div className="h-[300px] md:h-[300px] flex w-full flex-col gap-y-4 items-center justify-center bg-white">
                        <h1 className="w-10/12 md:w-full text-center text-xl md:text-3xl pb-4">About RemotifyEurope</h1>
                        <h2 className="w-11/12 md:w-10/12 text-center text-slate-600 text-sm md:text-md mb-10">RemotifyEurope aims to assist job seekers in Europe and in European time zones in discovering outstanding remote job opportunities. We compile collections of the remote job listings across various career domains. We take pride in our track record of connecting countless individuals with companies offering remote careers that match their skills and aspirations.</h2>
                    </div>

                    <div className="h-[500px] md:h-[300px] flex w-full flex-col md:flex-row md:gap-x-8 gap-y-6 items-center justify-center bg-remotify-lb">
                        <SubscriptionStats number={"300+"} description={"Remote Jobs posted per month"}/>
                        <SubscriptionStats number={"300+"} description={"Satisfried Job Seekers"}/>
                        <SubscriptionStats number={"100+"} description={"Actively Hiring Remote Companies"}/>
                    </div>
                    <div className="h-[500px] md:h-[300px] flex w-full flex-col gap-y-4 items-center justify-center bg-white">
                        <h1 className="w-10/12 md:w-full text-center text-xl md:text-3xl pb-4">Ready to Join and Find Your Next <span className="font-bold">Remote</span> adventure?</h1>
                        <Link href={"#top"} className='px-20 py-2 bg-orange-500 hover:bg-remotify-db text-white transition duration-1000 shadow-lg hover:shadow-xl border-1 border-slate-200 rounded-xl'>Subscribe Now</Link>
                    </div>
                    
                </div>
                ) : (
                    <div className='flex items-center justify-center w-screen'>
                        <Image src={'/loading.svg'} width={300} height={300} alt='loading_svg'></Image>
                    </div>
                )
            }
            <Footer></Footer>
        </>
    )
}
