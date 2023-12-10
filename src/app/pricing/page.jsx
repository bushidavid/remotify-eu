
import Link from 'next/link';
import PricingCard from '../components/pricing-card';


const getPrices = async () => {

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products`);
    return res.json();
}

export default async function Page() {

    if(!process.env.NEXT_PUBLIC_BASE_URL){
        return null;
    }

    const prices = await getPrices();

  return (
    <>
      <Link rel="preconnect" href="https://fonts.gstatic.com" /> 
      <Link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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
                      {
                        prices && prices.map((price) => (
                            <PricingCard key={price.id} price={price.unit_amount} nickname={price.nickname} id={price.id}/>
                        ))
                      }
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}
