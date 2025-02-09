
import Link from 'next/link';
import PricingCard from '../../components/pricing-card';
import Footer from '../../components/footer';
import Image from 'next/image';

export const metadata = {
    title: 'RemotifyEurope - Post a Job and Reach Hundreds of Candidates in Europe and in European Time Zones',
    description: 'Post a Job and Find Hundreds of Candidates in Europe and in European Time Zones',
}


const getPrices = async () => {

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products`, { next: { revalidate: 0, cache: 'no-store' } });
    return res.json();
}

const getFeatures = async () => {

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-features`, { next: { revalidate: 0, cache: 'no-store' } })
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
        console.log("logging fetched prices: ", prices);
        if (prices.length > 0) {
            prices.sort((a, b) => a.unit_amount - b.unit_amount);
        }
    } catch (error) {
        console.log("Error fetching prices: ", error);

    }

    try {
        products = await getFeatures(); 
        console.log("logging features: ", products);
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
                            <div className="flex flex-col justify-center items-center">
                                <div className="">
                                    <div className="flex flex-col items-center text-center font-semibold">
                                        <h1 className="text-4xl md:text-6xl text-remotify-db w-11/12 md:max-w-none">
                                            Hire Top Remote <span className="text-remotify-lb tracking-wide" >Talent</span> Across Europe 
                                            
                                        </h1>
                                        <p className="pt-6 text-base md:text-xl text-slate-500 font-normal w-full px-8 md:w-full max-w-6xl">
                                            At RemotifyEurope, we connect companies with a growing pool of talented candidates across Europe and European time zones. Our streamlined job board ensures your remote opportunities get seen by the right people — ambitious, skilled professionals ready to make a difference in your business.
                                        </p>
                                    </div>
                                    <div className="my-10 flex md:flex-row items-center md:justify-center md:items-stretch  flex-col md:gap-x-4 gap-y-4 md:gap-y-0">
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
                                <div className='bg-remotify-db w-full h-fit'>
                                    <div className="flex flex-col items-center text-center font-semibold py-10 gap-y-4">
                                        <h2 className="text-3xl md:text-5xl text-slate-200">
                                            <span className="text-remotify-lb tracking-wide" >Special Offer: </span>Get Started for Free!
                                            
                                        </h2>
                                        <p className="pt-6 text-base md:text-xl text-slate-300 font-normal w-full px-8 md:w-full max-w-5xl">
                                            To help you discover the benefits of hiring with RemotifyEurope, we’re offering 3 FREE job posts for new companies in their first month.
                                        </p>
                                        <p className="pt-6 text-base md:text-slate-300 font-normal w-full px-8 md:w-full max-w-6xl">
                                            Post your first listing today and see why businesses trust us to find top European talent.
                                        </p>
                                        <Link
                                            href={'/pricing'}
                                            className="font-poppins text-xl my-4 bg-remotify-lb text-remotify-db font-normal rounded-md py-2 px-4"
                                        >
                                            Post a Job Now!
                                        </Link>
                                    </div>
                                    
                                </div>
                                <div className='w-full flex flex-col items-center py-10'>
                                    <div className="flex flex-col items-center text-center font-semibold mb-10 gap-y-4">
                                        <h2 className="text-3xl md:text-5xl text-remotify-db">
                                           How We Help You  <span className="text-remotify-lb tracking-wide" >Stand Out</span>
                                        </h2>
                                        <p className="pt-6 text-base md:text-xl text-slate-600 font-normal w-full px-8 md:w-full max-w-5xl">
                                        At RemotifyEurope, we understand that every job is unique. That&apos;s why we go the extra mile to showcase your opportunities to the most relevant candidates.
                                        </p>
                                        
                                    </div>
                                    <div className='flex items-center justify-center md:max-w-7xl '>
                                        <div className='w-8/12 md:w-6/12'>
                                            <ul className='list-disc list-outside leading-8 md:leading-[40px] text-slate-600 text-sm md:text-xl'>
                                                <li><span className='font-bold'>Personalized Support:</span> Need assistance crafting the perfect job listing? We&apos;re here to help.
                                                </li>
                                                <li><span className='font-bold'>Quality Over Quantity:</span> Unlike other platforms, we focus on delivering your listing to candidates who meet your needs.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-remotify-lb w-full'>
                                    <div className="flex flex-col items-center text-center font-semibold py-10 gap-y-4">
                                        <h2 className="text-3xl md:text-5xl text-remotify-db">
                                            <span className="tracking-wide" >Why Start </span>Now?
                                            
                                        </h2>
                                        <p className="pt-6 text-base md:text-xl text-slate-700 font-normal w-full px-8 md:w-full max-w-5xl">
                                        The earlier you list your job, the sooner you&apos;ll find the ideal candidate. Don&apos;t let great talent slip away — post your job today and join our growing network of companies that hire smarter.
                                        </p>
                                        
                                        <Link
                                            href={'/pricing'}
                                            className="font-poppins text-xl my-4 bg-remotify-db text-white font-normal rounded-md py-2 px-4"
                                        >
                                            Post a Job Now!
                                        </Link>
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
