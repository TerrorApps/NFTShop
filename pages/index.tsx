import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  var image = null;
  return (
  // <div className="py-12 bg-white">
  //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //     <Link href="/0n1">
  //       <a>0n1</a>
  //     </Link>
  //     <Link href="/azuki">
  //       <a>Azuki</a>
  //     </Link>
  //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //     0n1
  //     </button>
  //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //     Azuki
  //     </button>
  //   </div>
  // </div>
  <div className="bg-gray-50">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      <span className="block">NFT Phone Wallpaper Regenerator</span>
      <span className="block text-indigo-600">Click on any project.</span>
      <span className="block text-indigo-600">Send any donations to BokuWaTaka.eth ❤️ </span>
    </h2>
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
      <div className="inline-flex rounded-md shadow">
        <Link href="/0n1">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">0n1 Phone</a>
        </Link>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
        <Link href="/azuki">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Azuki Phone</a>
        </Link>
      </div>
    </div>
  </div>
</div>
  )
}
