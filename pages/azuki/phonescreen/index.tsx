import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'
import PhoneScreenList from '../../components/phone_screen_list'

export default function Home() {
    return (
        <PhoneScreenList
            name="azuki"
            floor={0}
            ceiling={1000}
            cid="QmTVEzUdJiqFV5KeMwp4pgymTzaXcqZo5KTaHNsskuie76"
        />
    )
}