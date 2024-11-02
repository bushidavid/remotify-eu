
import Link from 'next/link';
import PricingCard from '../components/pricing-card';
import Footer from '../components/footer';

export const metadata = {
    title: 'RemotifyEurope - Pricing',
    description: 'The best remote job board in Europe',
}


const getPrices = async () => {

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products`, { next: { revalidate: 0 } });
    return res.json();
}

const getFeatures = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-features`, { next: { revalidate: 0 } })
    return res.json();

}

export default async function Page() {

    if(!process.env.NEXT_PUBLIC_BASE_URL){
        return null;
    }

    const { prices }  = await getPrices();
    prices.sort((a, b) => a.unit_amount - b.unit_amount);

    const products = await getFeatures();


  return (
    <div className="flex flex-col min-h-screen w-full">
            
            <main className="flex-grow">
                <div className="font-sans mt-10">
                    <div className="flex justify-center items-center">
                        <div className="">
                            <div className="text-center font-semibold">
                                <h1 className="text-5xl">
                                    <span className="text-remotify-lb tracking-wide">Flexible </span>
                                    <span className='text-remotify-db'>Plans</span>
                                </h1>
                                <p className="pt-6 text-xl text-gray-600 font-normal w-full px-8 md:w-full">
                                    Choose a plan that works best for you and<br/> your team.
                                </p>
                            </div>
                            <div className="pt-16 flex md:flex-row flex-col">
                                <PricingCard id={prices[0].id} price={prices[0].unit_amount} nickname={prices[0].nickname} description={"As simple as it gets"} features={products[0].features} />
                                <PricingCard id={prices[1].id} price={prices[1].unit_amount} nickname={prices[1].nickname} description={"Because you are a Pro"} features={products[2].features}/>
                                <PricingCard id={prices[2].id} price={prices[2].unit_amount} nickname={prices[2].nickname} description={"The Best Ever"} features={products[1].features}/>
                                <PricingCard id={Math.random()} price={"Custom"} nickname={"Custom"} description={"Tailored for You"} features={products[1].features}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
    </div>
  )
}
