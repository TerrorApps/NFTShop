import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  const [failedFetch, setFailedFetch] = useState(false)
  const [twitterBanner, setTwitterBanner] = useState(false)
  const [phoneScreen, setPhoneScreen] = useState(true)
  const [buttonColor, setButtonColor] = useState()

  var image = null;
  return (
  <div className="pl-4">
          <style jsx global>{`
  body {
    background: #000;
  }
`}</style>
    <div className="pt-4">
        <Image className="pt-2" src="https://assets.website-files.com/60ef399b992671a8275e6cff/61cd2919c237ed3643da09b6_0n1logo.svg" alt="" width="72" height="72" />
    </div>
    <div className="pt-4">
        <button 
            onClick={() => { setTwitterBanner(true); setPhoneScreen(false) }}
            className="pt-4 pl-4 bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-green-700">
            TwitterBanner
        </button>
        <button 
            onClick={() => { setPhoneScreen(true); setTwitterBanner(false) }}
            className="pt-4 pl-4 bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-green-700">
            Phone Screen
        </button>
    </div>
    { phoneScreen ?
     (
         <div>
             <p className="pt-4 text-2xl text-green-500 ...">Phone Screen</p>
            <form className="flex"
                onSubmit={async (e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                    tokenid: { value: string };
                };
                const tokenId = target.tokenid.value;
                setLoading(true)
                setFailedFetch(false)
                var res = await fetch(`/api/hello?tokenId=${tokenId}`)
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
         </div>
     ) : 
     (
         <div>
        <p className="pt-4 text-2xl text-green-500 ...">Twitch Banner</p>
        <form className="flex"
        onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            tokenid: { value: string },
            tokenid2: { value: string},
            tokenid3: { value: string},
        };
        const tokenId = target.tokenid.value;
        const tokenId2 = target.tokenid2.value;
        const tokenId3 = target.tokenid3.value;
        setLoading(true)
        setFailedFetch(false)
        console.log(tokenId)
        console.log(tokenId2)
        console.log(tokenId3)
        var res = await fetch(`/api/0n1/twitter_banner?tokenId=${tokenId}&tokenId2=${tokenId2}&tokenId3=${tokenId3}`)
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
        <input type="text" className="p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid" placeholder="First Token ID" required autoFocus/>
        <input type="text" className="p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid2" placeholder="Second Token ID" required />
        <input type="text" className="p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" name="tokenid3" placeholder="Third Token ID" required />
        <button className="px-8 rounded-r-lg bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">{ loading ? "Thinking......." : "Press This Button" }</button>
        </form>
         </div>
     ) 
    }
    <span className="pt-4 block text-green-500">Send any donations to BokuWaTaka.eth ❤️ </span>
    <a href="https://twitter.com/BokuWaTakaE?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @BokuWaTakaE</a>
    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    { failedFetch ? <span className="pt-4 pl-4 block text-green-500"> Token ID is invalid. </span> : <div></div>}
    {value != "value" && !loading && <img className="border-dashed border-2 border-sky-500 object-cover h-2532 w-1170 ..." src={value}></img>}
</div>
  );
}