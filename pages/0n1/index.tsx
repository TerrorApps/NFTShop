import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  var image = null;
  return (
  <div>
          <style jsx global>{`
  body {
    background: #000;
  }
`}</style>
    <div className="pt-4 pl-4">
      <Image className="pt-2 pl-2" src="https://assets.website-files.com/60ef399b992671a8275e6cff/61cd2919c237ed3643da09b6_0n1logo.svg" alt="" width="72" height="72" />
    </div>
  	<form className="m-4 flex"
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          tokenid: { value: string };
        };
        const tokenId = target.tokenid.value;
        setLoading(true)
        var res = await fetch(`/api/hello?tokenId=${tokenId}`)
        var blob = await res.blob()
        var urlCreator = window.URL || window.webkitURL
        setValue(urlCreator.createObjectURL(blob))
        setLoading(false)
    }}
    >
    	<input type="text" className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid" placeholder="Token ID" required autoFocus/>
	    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">{ loading ? "Thinking......." : "Press This Button" }</button>
	</form>
  <div className="pt-4 pl-4">
    <a href="https://nowpayments.io/donation?api_key=A1Q3P0C-0YNMDP1-MYYER0B-H5BFPY9" target="_blank">
      <img src="https://nowpayments.io/images/embeds/donation-button-white.svg" alt="Cryptocurrency & Bitcoin donation button by NOWPayments" />
    </a>
  </div>
  {value != "value" && !loading && <img className="object-cover h-2532 w-1170 ..." src={value} />}
</div>
  );
}
