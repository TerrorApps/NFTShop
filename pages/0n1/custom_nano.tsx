import Head from 'next/head'
import React, { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'

export default function Azuki() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  const [failedFetch, setFailedFetch] = useState(false)
  const [showOptions, setOptions] = useState(false)
  const [overlay, setOverlay] = useState("Nano_Gucci")
  var image = null;

  const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
        tokenid: { value: string };
        };
        const tokenId = target.tokenid.value;
        setLoading(true)
        setFailedFetch(false)
        var res = await fetch(`/api/0n1/custom_nano?tokenId=${tokenId}&overlay=${overlay}`)
        setLoading(false)
        if (res.status == 400) {
            setFailedFetch(true)
        } else {
            var blob = await res.blob()
            var urlCreator = window.URL || window.webkitURL
            setValue(urlCreator.createObjectURL(blob))
        }
  }

  const toggleOptions = () => {
      setOptions(!showOptions)
  }

  const onClickOverlay = (overlay: string) => {
      setOverlay(overlay)
      setOptions(false)
  }

  return (
  <div>
          <style jsx global>{`
  body {
    background: #FFFFFF;
  }
`}</style>
  	<form className="m-4 flex"
      onSubmit={onSubmit}
    >
    	<input type="text" className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid" placeholder="Token ID" required autoFocus/>
        <div className="relative inline-block text-left">
            <div>
                <button 
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="menu-button"
                    onClick={toggleOptions}
                    aria-expanded="true"
                    aria-haspopup="true">
                { overlay ? overlay.split("_")[1] : "Options" }
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            { showOptions &&
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            <a href="#" onClick={() => onClickOverlay("Nano_Gucci")} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Gucci</a>
                        </div>
                    </div>
            }
        </div>
	    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">{ loading ? "Thinking......." : "Press This Button" }</button>
	</form>
    <span className="pt-4 pl-4 block text-zinc-500">Send any donations to BokuWaTaka.eth ❤️ </span>
    { failedFetch ? <span className="pt-4 pl-4 block text-zinc-500"> Token ID is invalid. </span> : <div></div>}
    { value != "value" && !loading && <img className="object-cover h-2532 w-1170 ..." src={value} />}
</div>
  );
}