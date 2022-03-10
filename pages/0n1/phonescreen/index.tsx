import { useState } from 'react'
import _ from "lodash"
// import PhoneScreenList from '../../components/phone_screen_list'
import dynamic from 'next/dynamic'

const PhoneScreenListNoSSR = dynamic(() => import('../../components/phone_screen_list'), {
    ssr: false
})

export default function Home() {
    const [listName, setListName] = useState("0n1")

    return (
        <div>
            <div>
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Phone</a>
                    </li>
                    <li className="mr-2">
                        <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">Izzy R0N1</a>
                    </li>
                </ul>
            </div>


        <PhoneScreenListNoSSR
            name="0n1"
            floor={1}
            ceiling={7777}
            cid="QmPSmLFF9aPM3CSU6WSTrtxobPGt6xxmLsEkNRo8K8YQZn"
        />
        </div>
    )
}