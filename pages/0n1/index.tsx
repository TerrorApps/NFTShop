import { useState } from 'react'
import _ from "lodash"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const PhoneScreenListNoSSR = dynamic(() => import('../components/phone_screen_list'), {
    ssr: false
})

const NanoListNoSSR = dynamic(() => import('../components/list/nano_suit_square_list'), {
    ssr: false
})

const IzzyListNoSSR = dynamic(() => import('../components/list/square_list'), {
    ssr: false
})

export default function Home() {
    const [currentTab, setCurrentTab] = useState("phonescreen")

    const router = useRouter()

    const handleTabChange = (event: React.FormEvent<HTMLAnchorElement>, tabName: string) => {
        setCurrentTab(tabName)
    }

    const renderList = () => {
        switch (currentTab) {
            case 'izzy':
                return (
                    <IzzyListNoSSR
                        name="0n1"
                        floor={1}
                        ceiling={7777}
                        cid="QmPLxxvzKPLMGDHQoAdo2ZHx7VHHUdf342tbQjyVmi9VXm"
                        fileName="izzy"
                    />
                )
            case 'phonescreen':
                return (
                    <PhoneScreenListNoSSR
                        name="0n1"
                        floor={1}
                        ceiling={7777}
                        cid="QmPSmLFF9aPM3CSU6WSTrtxobPGt6xxmLsEkNRo8K8YQZn"
                    />
                )
            case 'nanoSuit':
                return (
                    <NanoListNoSSR
                        name="0n1"
                        floor={1}
                        ceiling={7777}
                        cid="QmeKo9m435po4bd7HEqgwd2E1g4imioNcy7RtggW3rHJaV"
                        fileName="nano_suit"
                    />
                )
            case 'framePhone':
                return (
                    <PhoneScreenListNoSSR
                        name="frame"
                        floor={1}
                        ceiling={7777}
                        cid="QmVfcwdYrN7QXByqM1VJbQRbL6XabXkitTtNs95SfGTtC3"
                    />
                )
        }
    }

    const determineTabColor = (tabName: string) => {

        if (currentTab == tabName) {
            return "inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
        } else {
            return "inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
        }
    }

    return (
        <div>
            <div>
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <a
                            href="#phonescreen"
                            onClick={(e) => handleTabChange(e, "phonescreen")}
                            className={determineTabColor("phonescreen")}>
                            Phone
                        </a>
                    </li>
                    <li className="mr-2">
                        <a
                            href="#framePhone"
                            onClick={(e) => handleTabChange(e, "framePhone")}
                            className={determineTabColor("framePhone")}>
                            Frame Phone
                        </a>
                    </li>
                    <li className="mr-2">
                        <a
                            href="#izzy"
                            onClick={(e) => handleTabChange(e, "izzy")}
                            className={determineTabColor("izzy")}
                            aria-current="page">
                            Izzy R0N1
                        </a>
                    </li>
                    <li className="mr-2">
                        <a 
                            href="#nanoSuit"
                            onClick={(e) => handleTabChange(e, "nanoSuit")}
                            className={determineTabColor("nanoSuit")}
                            aria-current="page">
                            Nano Suit
                            </a>
                    </li>
                    <li className="mr-2">
                        <a 
                            href="/0n1/custom_nano"
                            onClick={(e) => handleTabChange(e, "nanoSuit")}
                            className={determineTabColor("customNano")}
                            aria-current="page">
                            Custom Nano Suit
                            </a>
                    </li>
                </ul>
            </div>

        {renderList()}
        </div>
    )
}