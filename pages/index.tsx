import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  var image = null;
  return (
  <div className="bg-gray-50">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      <span className="block">NFT Image Regenerator</span>
      <span className="block text-indigo-600">Click on any project.</span>
      <span className="block text-indigo-600">Send any donations to BokuWaTaka.eth ❤️ </span>
      <span className="block text-indigo-600">Follow me on Twitter: @BokuWaTakaE </span>
    </h2>
  </div>
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
      <div className="inline-flex rounded-md shadow">
          <Link href="/0n1">
            <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">0n1</a>
          </Link>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Link href="/azuki">
            <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Azuki</a>
          </Link>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Link href="/killergf">
            <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Killergf</a>
          </Link>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Link href="/bayc">
            <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">BAYC</a>
          </Link>
        </div>
    </div>
  </div>
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
      <div className="ml-3 inline-flex rounded-md shadow">
        <Link href="/uwucrew">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">uwucrew</a>
        </Link>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
        <Link href="/deadfellaz">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">deadfellaz</a>
        </Link>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
        <Link href="/fishyfam">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">fishyfam</a>
        </Link>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
        <Link href="/r0n1">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">r0n1 world</a>
        </Link>
      </div>
    </div>
  </div>
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
      <div className="ml-3 inline-flex rounded-md shadow">
        <Link href="/longlost">
          <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Long Lost</a>
        </Link>
      </div>
    </div>
  </div>
</div>
  )
}
