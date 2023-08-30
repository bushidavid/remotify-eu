import Link from 'next/link'

export default function Page() {


  return (
    <>
      <Link rel="preconnect" href="https://fonts.gstatic.com" /> 
      <Link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div class="font-sans mt-10">
          <div class="max-h-screen flex justify-center items-center">
              <div class="">
                  <div class="text-center font-semibold">
                      <h1 class="text-5xl">
                          <span class="text-remotify-lb tracking-wide">Flexible </span>
                          <span className='text-remotify-db'>Plans</span>
                      </h1>
                      <p class="pt-6 text-xl text-gray-600 font-normal w-full px-8 md:w-full">
                          Choose a plan that works best for you and<br/> your team.
                      </p>
                  </div>
                  <div class="pt-16 flex flex-row">
                      {/* <!-- Basic Card --> */}
                      <div class="w-84 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
                          <h1 class="text-black font-semibold text-2xl">Basic</h1>
                          <p class="pt-2 tracking-wide">
                              <span class="text-gray-400 align-top">$ </span>
                              <span class="text-3xl font-semibold">29</span>
                              
                          </p>
                          <hr class="mt-4 border-1"></hr>
                          <div class="pt-8">
                              <p class="font-semibold text-gray-400 text-left">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      Create <span class="text-black">one Job Post</span>
                                  </span>
                              </p>
                              <p class="font-semibold text-gray-400 text-left pt-5">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      Flexible <span class="text-black">team meetings</span>
                                  </span>
                              </p>
                              <p class="font-semibold text-gray-400 text-left pt-5">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      <span class="text-black">5 TB</span> cloud storage
                                  </span>
                              </p>

                              <a href="#" class="">
                                  <p class="w-full py-4 bg-remotify-lb mt-8 rounded-xl text-white">
                                      <span class="font-medium">
                                          Choose Plan
                                      </span>
                                  </p>
                              </a>
                          </div>
                      </div>
                      {/* <!-- StartUp Card --> */}
                      <div class="w-80 p-8 bg-remotify-db text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-110">
                          <h1 class="text-white font-semibold text-2xl">Pro</h1>
                          <p class="pt-2 tracking-wide">
                              <span class="text-gray-400 align-top">$ </span>
                              <span class="text-3xl font-semibold">59</span>
                              
                          </p>
                          <hr class="mt-4 border-1 border-gray-600"></hr>
                          <div class="pt-8">
                              <p class="font-semibold text-gray-400 text-left">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      All features in <span class="text-white">Basic</span>
                                  </span>
                              </p>
                              <p class="font-semibold text-gray-400 text-left pt-5">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      Flexible <span class="text-white">call scheduling</span>
                                  </span>
                              </p>
                              <p class="font-semibold text-gray-400 text-left pt-5">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      <span class="text-white">15 TB</span> cloud storage
                                  </span>
                              </p>

                              <a href="#" class="">
                                  <p class="w-full py-4 bg-remotify-lb mt-8 rounded-xl text-white">
                                      <span class="font-medium">
                                          Choose Plan
                                      </span>
                                  </p>
                              </a>
                          </div>
                          <div class="absolute top-4 right-4">
                              <p class="bg-remotify-lb font-semibold px-4 py-1 rounded-full uppercase text-xs">Popular</p>
                          </div>
                      </div>
                      {/* <!-- Enterprise Card --> */}
                      <div class="w-84 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
                          <h1 class="text-black font-semibold text-2xl">Custom</h1>
                          <p class="pt-2 tracking-wide">
                              <span class="text-gray-400 align-top">$ </span>
                              <span class="text-3xl font-semibold">99</span>
                          </p>
                          <hr class="mt-4 border-1"></hr>
                          <div class="pt-8">
                              <p class="font-semibold text-gray-400 text-left">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      All features in <span class="text-black">Pro</span>
                                  </span>
                              </p>
                              <p class="font-semibold text-gray-400 text-left pt-5">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      Growth <span class="text-black">oriented</span>
                                  </span>
                              </p>
                              <p class="font-semibold text-gray-400 text-left pt-5">
                                  <span class="material-icons align-middle">
                                      done
                                  </span>
                                  <span class="pl-2">
                                      <span class="text-black">Unlimited</span> cloud storage
                                  </span>
                              </p>

                              <a href="#" class="">
                                  <p class="w-full py-4 bg-remotify-lb mt-8 rounded-xl text-white">
                                      <span>
                                        Get a Quote
                                      </span>
                                  </p>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}
