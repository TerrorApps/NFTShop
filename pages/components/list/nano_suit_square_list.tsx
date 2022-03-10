import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'
import _ from "lodash"
import PhoneScreenModal from '../phone_screen_modal'
import SquareModal from '../modal/SquareModal'

interface SquareList {
    name: string,
    floor: number,
    ceiling: number,
    cid: string,
    fileName: string
}

export default function NanoSquareList(props: SquareList) {
    const [tokenIds, setTokenIds] = useState(Array.from({length: 100}, () => Math.floor(Math.random() * props.ceiling)))
    const [tokenId, setTokenId] = useState("")
    const [showModal, setModal] = useState(false)
    const [modalTokenId, setModalTokenId] = useState(1)
    let timeout: any = null;

    const updateModal = (modalState: boolean, tokenId: number) => {
        setModal(modalState)
        setModalTokenId(tokenId)
    }

    const handleTokenIdChange = (event: React.FormEvent<HTMLInputElement>) => {
        setTokenId(event.currentTarget.value)
    }

    const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
        var nanoRandom = Math.floor(Math.random() * (6 - 1) + 1)
        return `https://regentool.mypinata.cloud/ipfs/${props.cid}/${props.fileName}_${src}_${nanoRandom}.png`
    }

    const tokenLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `https://regentool.mypinata.cloud/ipfs/${props.cid}/${props.fileName}_${src}.png`
    }

    return (
        <main className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                    <input
                        value={tokenId}
                        onChange={(e) => handleTokenIdChange(e)}
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
                    { tokenId ? (
                        <>
                        <a 
                            className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={tokenLoader}
                                    src={`${tokenId}_1`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="585"
                                    quality={100}
                                />
                            </div>
                        </a>
                        <a 
                        className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={tokenLoader}
                                    src={`${tokenId}_2`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="585"
                                    quality={100}
                                />
                            </div>
                        </a>
                        <a 
                        className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={tokenLoader}
                                    src={`${tokenId}_3`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="585"
                                    quality={100}
                                />
                            </div>
                        </a>
                        <a 
                        className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={tokenLoader}
                                    src={`${tokenId}_4`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="585"
                                    quality={100}
                                />
                            </div>
                        </a>
                        <a 
                        className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={tokenLoader}
                                    src={`${tokenId}_5`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="585"
                                    quality={100}
                                />
                            </div>
                        </a>
                        <a 
                        className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                            <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                <Image
                                    key={`${tokenId}-${new Date().getTime()}`}
                                    loader={tokenLoader}
                                    src={`${tokenId}_6`}
                                    alt=""
                                    className=" duration-300 w-full h-full object-center object-cover fade-in "
                                    width="585"
                                    height="585"
                                    quality={100}
                                />
                            </div>
                        </a>
                        </>                                                                                               
                        )
                       : 
                       tokenIds.map((id) => {
                            return(
                            <a 
                                key={id}
                                className="group cursor-pointer fade-in text-sm lg:-20  duration-300">
                                <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 shadow-me animate-fade-in-down">
                                    <Image
                                        key={`${tokenId}-${new Date().getTime()}`}
                                        loader={myLoader}
                                        src={`${id + props.floor}`}
                                        alt=""
                                        className=" duration-300 w-full h-full object-center object-cover fade-in"
                                        width="585"
                                        height="585"
                                        loading="lazy"
                                        quality={100}
                                    />
                                </div>
                            </a>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            {/* {showModal && <NanoSquareList
                updateModal={updateModal}
                tokenId={modalTokenId}
                cid={props.cid}
                name={props.name}
                fileName="nano_suit"
            />} */}
        </main>
    )
}