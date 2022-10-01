import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'
import dynamic from 'next/dynamic'

const PhoneScreenListNoSSR = dynamic(() => import('../../components/akyllers_phone_screen_list'), {
    ssr: false
})

export default function Home() {
    return (
        <PhoneScreenListNoSSR
            name="akyller"
            floor={1}
            ceiling={4444}
            cid="QmdUMnNCkZQVgH1epDvRr52juHfMP8Ts6gHTBUst3zZtZ1"
        />
    )
}