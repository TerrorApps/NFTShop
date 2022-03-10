import { useState } from 'react'
import _ from "lodash"
// import PhoneScreenList from '../../components/phone_screen_list'
import dynamic from 'next/dynamic'

const PhoneScreenListNoSSR = dynamic(() => import('../components/phone_screen_list'), {
    ssr: false
})

export default function Home() {
    return (
        <div>
        <PhoneScreenListNoSSR
            name="0n1"
            floor={1}
            ceiling={7777}
            cid="QmPSmLFF9aPM3CSU6WSTrtxobPGt6xxmLsEkNRo8K8YQZn"
        />
        </div>
    )
}