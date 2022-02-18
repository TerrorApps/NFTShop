import { useState } from 'react'
import _ from "lodash"
import PhoneScreenList from '../../components/phone_screen_list'
import PhoneScreenModal from '../../components/phone_screen_modal'

export default function Home() {
    return (
        <div>
        <PhoneScreenList
            name="0n1"
            floor={1}
            ceiling={7777}
            cid="QmPSmLFF9aPM3CSU6WSTrtxobPGt6xxmLsEkNRo8K8YQZn"
        />
        </div>
    )
}