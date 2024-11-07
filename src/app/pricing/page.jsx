
import Link from 'next/link';
import PricingCard from '../components/pricing-card';
import Footer from '../components/footer';
import Image from 'next/image';

export const metadata = {
    title: 'RemotifyEurope - Post a Job and Reach Hundreds of Candidates in Europe and in European Time Zones',
    description: 'Post a Job and Find Hundreds of Candidates in Europe and in European Time Zones',
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

    let prices = [];
    let products = [];

    

    try {
        const priceData = await getPrices();
        prices = priceData?.prices || [];
        if (prices.length > 0) {
            prices.sort((a, b) => a.unit_amount - b.unit_amount);
        }
    } catch (error) {
        console.log("Error fetching prices: ", error);

    }

    try {
        products = await getFeatures();
    } catch (error) {
        console.log("Error fetching features: ", error);
    }

    // Create a map of products by ID for quick lookup
    const productMap = products.reduce((map, product) => {
        map[product.id] = product.features;
        return map;
    }, {});

    // Map prices with their respective features
    const priceCards = prices.map(price => ({
        ...price,
        features: productMap[price.product] || []
    }));
    
    return (
        <>
        { prices ? (
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
                                            Choose a plan that works best for you and your team.
                                        </p>
                                    </div>
                                    <div className="my-10 flex md:flex-row flex-col gap-x-4">
                                    {priceCards.map((card, index) => (
                                            <PricingCard
                                                key={card.id}
                                                id={card.id}
                                                price={card.unit_amount}
                                                nickname={card.nickname}
                                                description={index === 0 ? "As simple as it gets" : index === 1 ? "Because you are a Pro" : "The Best Ever"}
                                                features={card.features}
                                            />
                                        ))}
                                        <PricingCard
                                            id={Math.random()}
                                            price={"Custom"}
                                            nickname={"Custom"}
                                            description={"Tailored for You"}
                                            features={productMap[prices[1]?.product] || []}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    
                    <Footer />
            </div> 
            ) :
            (
            <div className='flex items-center justify-center w-screen'>
                <Image src={'/loading.svg'} width={300} height={300} alt='loading_svg'></Image>
            </div>
            )
        }
        </>
    )
}
