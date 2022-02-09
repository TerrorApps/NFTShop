import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'

export default function Azuki() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  const [failedFetch, setFailedFetch] = useState(false)
  var image = null;
  return (
  <div className="pl-4">
          <style jsx global>{`
  body {
    background: #191a1c;
  }
`}</style>
    <div className="pt-4 pl-4 pb-4">
        <div className="pb-4 text-slate-200">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </a>
        </div>
      <img src="https://thelonglost.io/wp-content/uploads/2022/01/LL-LOGO.svg" alt="" width="100" height="72" />
    </div>
  	<form className="flex"
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          tokenid: { value: string };
        };
        const tokenId = target.tokenid.value;
        setLoading(true)
        setFailedFetch(false)
        var res = await fetch(`/api/longlost/phonescreen?tokenId=${tokenId}`)
        setLoading(false)
        if (res.status == 400) {
            setFailedFetch(true)
        } else {
            var blob = await res.blob()
            var urlCreator = window.URL || window.webkitURL
            setValue(urlCreator.createObjectURL(blob))
        }
    }}
    >
    	<input type="text" className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid" placeholder="Token ID" required autoFocus/>
	    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">{ loading ? "Thinking......." : "Press This Button" }</button>
	</form>
    <span className="pt-4 block text-green-400">Send any donations to BokuWaTaka.eth ❤️ </span>
    <a href="https://twitter.com/BokuWaTakaE?ref_src=twsrc%5Etfw" className="twitter-follow-button text-slate-200" data-show-count="false">Follow @BokuWaTakaE</a>
    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    { failedFetch ? <span className="pt-4 pl-4 block text-green-400"> Token ID is invalid. </span> : <div></div>}
    { value != "value" && !loading && <img className="object-cover h-2532 w-1170 ..." src={value} />}
</div>
  );
}