import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'

export default function Azuki() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  var image = null;
  return (
  <div>
          <style jsx global>{`
  body {
    background: #d31c3c;
  }
`}</style>
    <div className="pt-4 pl-4">
      <img src="https://www.azuki.com/Azuki%20Logo%20White.svg" alt="" width="500" height="72" />
    </div>
  	<form className="m-4 flex"
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          tokenid: { value: string };
        };
        const tokenId = target.tokenid.value;
        setLoading(true)
        var res = await fetch(`/api/azuki?tokenId=${tokenId}`)
        var blob = await res.blob()
        var urlCreator = window.URL || window.webkitURL
        setValue(urlCreator.createObjectURL(blob))
        setLoading(false)
    }}
    >
    	<input type="text" className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid" placeholder="Token ID" required autoFocus/>
	    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">{ loading ? "Thinking......." : "Press This Button" }</button>
	</form>
    <span className="pt-4 pl-4 block text-slate-50">Send any donations to BokuWaTaka.eth ❤️ </span>
  {value != "value" && !loading && <img className="object-cover h-2532 w-1170 ..." src={value} />}
</div>
  );
}