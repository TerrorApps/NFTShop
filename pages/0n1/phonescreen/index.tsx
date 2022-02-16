import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://regentool.mypinata.cloud/ipfs/QmPSmLFF9aPM3CSU6WSTrtxobPGt6xxmLsEkNRo8K8YQZn/0n1_phonescreen_${src}`
}

export default function Home() {
    const [tokenIds, setTokenIds] = useState(Array.from(Array(100).keys()))
    return (
        <main className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Token ID" aria-label="Search" aria-describedby="button-addon2" />
                    </div>
                </div>
            </div>
            <div className="flex">
                {/* <form className="hidden w-1/4 col-start-1 lg:block sticky top-0 h-screen pt-32">
                    <div className="hidden lg:block relative z-10 flex items-end justify-between h-14 pb-6 border-b border-opacity-10 border-black"></div>
                    <div className="overflow-y-scroll pb-28 px-4 lg:px-0 pt-6 hide-scrollbar lg:max-h-[calc(100vh-11.5rem)]">
                    </div>

                </form> */}
                <div className="lg:px-8 w-full">
                    <div className="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1  lg:col-span-3">
                    {
                        tokenIds.map(tokenId => {
                            return(
                                <a className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                                <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                    <Image
                                        loader={myLoader}
                                        src={`${tokenId+1}.png`}
                                        alt=""
                                        className=" duration-300 w-full h-full object-center object-cover "
                                        width="585"
                                        height="1266"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="font-400  pb-2 -mt-1 text-2xs tracking-wider text-center uppercase">No. 6987</h3>
                                </a>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </main>
    )
}