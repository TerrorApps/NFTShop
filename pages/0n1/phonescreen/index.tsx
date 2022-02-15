import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://ipfs.io/ipfs/Qme4BpySeFqXvosRnPuk6RJ8qrm8sHw3kb3hChrp8X6Jkq/0n1_phonescreen_${src}`
}

export default function Home() {
    const [tokenIds, setTokenIds] = useState(Array.from(Array(10).keys()))
    return (
        <main className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
                {/* <form className="hidden w-1/4 col-start-1 lg:block sticky top-0 h-screen pt-32">
                    <div className="hidden lg:block relative z-10 flex items-end justify-between h-14 pb-6 border-b border-opacity-10 border-black"></div>
                    <div className="overflow-y-scroll pb-28 px-4 lg:px-0 pt-6 hide-scrollbar lg:max-h-[calc(100vh-11.5rem)]">
                    </div>

                </form> */}
                <div className="lg:px-8 w-full lg:pt-32 pt-28">
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
                                <p className="opacity-50  mt-3 uppercase font-mono tracking-widest text-3xs text-center">{`No. ${tokenId}`}</p>
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