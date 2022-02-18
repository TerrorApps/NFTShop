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

export default function PhoneScreenList(props: PhoneScreenList) {
    // const [tokenIds, setTokenIds] = useState(Array.from({length: 100}, () => Math.floor(Math.random() * props.ceiling)))
    const [tokenIds, setTokenIds] = useState(Array.from(Array(100).keys()))
    const [tokenId, setTokenId] = useState("")
    const [showModal, setModal] = useState(false)
    const [modalTokenId, setModalTokenId] = useState(1)

    const updateModal = (modalState: boolean, tokenId: number) => {
        console.log("update modal clicked")
        setModal(modalState)
        setModalTokenId(tokenId)
    }

    const handleTokenIdChange = (event: React.FormEvent<HTMLInputElement>) => {
        setTokenId(event.currentTarget.value)
    }

    const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `https://regentool.mypinata.cloud/ipfs/${props.cid}/${props.name}_phonescreen_${src}`
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
                    <div className="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1  lg:col-span-3">
                    { tokenId ?
                        <a 
                            onClick={() => {updateModal(true, Number(tokenId))}}
                            className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={myLoader}
                                    src={`${tokenId}.png`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="1266"
                                    loading='lazy'
                                />
                            </div>
                        </a>
                       : 
                       tokenIds.map((id) => {
                            return(
                            <a 
                                key={id}
                                onClick={() => {updateModal(true, id + props.floor)}}
                                className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                                <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                    <Image
                                        loader={myLoader}
                                        src={`${id + props.floor}.png`}
                                        alt=""
                                        className=" duration-300 w-full h-full object-center object-cover fade-in"
                                        width="585"
                                        height="1266"
                                        priority={true}
                                    />
                                </div>
                            </a>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            {showModal && <PhoneScreenModal
                updateModal={updateModal}
                tokenId={modalTokenId}
                cid={props.cid}
                name={props.name}
            />}
        </main>
    )
}

                {/* <form className="hidden w-1/4 col-start-1 lg:block sticky top-0 h-screen pt-32">
                    <div className="hidden lg:block relative z-10 flex items-end justify-between h-14 pb-6 border-b border-opacity-10 border-black"></div>
                    <div className="overflow-y-scroll pb-28 px-4 lg:px-0 pt-6 hide-scrollbar lg:max-h-[calc(100vh-11.5rem)]">
                    </div>

                </form> */}