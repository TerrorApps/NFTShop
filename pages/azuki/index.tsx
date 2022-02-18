import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'
import dynamic from 'next/dynamic'

const PhoneScreenListNoSSR = dynamic(() => import('../components/phone_screen_list'), {
    ssr: false
})

export default function Home() {
    return (
        <PhoneScreenListNoSSR
            name="azuki"
            floor={0}
            ceiling={1000}
            cid="QmTVEzUdJiqFV5KeMwp4pgymTzaXcqZo5KTaHNsskuie76"
        />
    )
}