import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'
import _ from "lodash"
import PhoneScreenModal from './phone_screen_modal'

interface PhoneScreenList {
    name: string,
    floor: number,
    ceiling: number,
    cid: string,
}

export default function AkyllerPhoneScreenList(props: PhoneScreenList) {
    const [tokenIds, setTokenIds] = useState(Array.from({length: 100}, () => Math.floor(Math.random() * props.ceiling)))
    const [tokenId, setTokenId] = useState("")

    const handleTokenIdChange = (event: React.FormEvent<HTMLInputElement>) => {
        setTokenId(event.currentTarget.value)
    }

    const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `https://peach-tired-shrimp-222.mypinata.cloud/ipfs/${props.cid}/banner_${src}`
    }

    return (
        <main className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                    <input
                        value={tokenId}
                        onChange={handleTokenIdChange}

                        type="search"
                        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Token ID"
                        aria-label="Search"
                        aria-describedby="button-addon2" />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="lg:px-8 w-full">
                    <div className="grid lg:grid-cols-1 2xl:grid-cols-1 grid-cols-1 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1  lg:col-span-3">
                    { tokenId ?
                        <a 
                            className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={myLoader}
                                    src={`${tokenId}.png`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="1500"
                                    height="500"
                                    loading='lazy'
                                />
                            </div>
                        </a>
                       : 
                       tokenIds.map((id) => {
                            return(
                            <a 
                                key={id}
                                className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                                <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                    <Image
                                        loader={myLoader}
                                        src={`${id + props.floor}.png`}
                                        alt=""
                                        className=" duration-300 w-full h-full object-center object-cover fade-in"
                                        width="1500"
                                        height="500"
                                        loading="lazy"
                                    />
                                </div>
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