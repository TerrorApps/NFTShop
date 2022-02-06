import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import Web3 from 'web3'
import React from 'react'
import { connect } from 'http2'
import ConnectToWalletConnect from 'web3modal/dist/providers/connectors/walletconnect'
//50a89fe053d44aacb6075ec9d0a8afc1
//https://mainnet.infura.io/YOUR_INFURA_API_KEY
const web3 = new Web3('https://mainnet.infura.io/50a89fe053d44aacb6075ec9d0a8afc1')
export default function Home() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  const [failedFetch, setFailedFetch] = useState(false)
  const [walletConnected, setWalletConnect] = useState(false)
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
    <div className="pt-4 pl-4">
        <span className="block text-green-500">Send any donations to BokuWaTaka.eth ❤️ </span>
        { walletConnected ?
        (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Wallet Connected</button>) :
        (<button onClick={() => {
                var typescriptWindow = window as any
                if (typescriptWindow.web3) {
                    typescriptWindow.web3 = new Web3(typescriptWindow.web3.currentProvider);
                    typescriptWindow.ethereum.enable()
                    setWalletConnect(true)
                }
                setWalletConnect(false)
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Connect Wallet
        </button>)}
        { failedFetch ? <span className="pt-4 pl-4 block text-red-500"> Token ID is invalid. </span> : <div></div>}
        {value != "value" && !loading && <img className="object-cover h-2532 w-1170 ..." src={value}></img>}
    </div>
</div>
  );
}
