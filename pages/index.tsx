import { useState } from 'react'
import Link from 'next/link'
import OniCard from './components/oni_card'
import AzukiCard from './components/azuki_card'
import UwuCard from './components/uwu_card'
import KillergfCard from './components/killergf_card'
import DeadfellazCard from './components/deadfellaz_card'
import FishyFamCard from './components/fishyfam_card'
import KarafuruCard from './components/karafuru_card'
import PxnCard from './components/pxn_card'
import AkyllerCard from './components/akyller_card'

export default function Home() {
  const [value, setValue] = useState("value")
  const [loading, setLoading] = useState(false)
  var image = null;
  return (
  <div className="flex flex-col">
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-indigo-600">Click on any project.</span>
          <span className="block text-indigo-600">Send any donations to 0xfuu.eth ❤️ </span>
          <span className="block text-indigo-600">Follow me on Twitter: @BokuWaTakaE </span>
        </h2>
      </div>
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <AkyllerCard />
      <PxnCard />
      <OniCard />
      <AzukiCard />
      <KarafuruCard />
      <UwuCard />
      <KillergfCard />
      <DeadfellazCard />
      <FishyFamCard />
    </div>
  </div>
</div>
  )
}
