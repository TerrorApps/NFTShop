import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'

interface SquareModal {
    updateModal: Function
    tokenId: number
    name: string
    cid: string,
    fileName: string
}

export default function SquareModal(props: SquareModal) {
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center" >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0"/>
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Image
                    src={`https://regentool.mypinata.cloud/ipfs/${props.cid}/${props.name}_${props.fileName}_${props.tokenId}.png`}
                    alt=""
                    className=" duration-300 w-full h-full object-center object-cover fade-in"
                    width="585"
                    height="585"
                    priority={true}
                />

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => props.updateModal(false, 0)}>
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
