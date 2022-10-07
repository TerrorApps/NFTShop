import Image from 'next/image'
import { useState } from 'react'
import { ImageLoaderProps } from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { render } from '@headlessui/react/dist/utils/render'

const PhoneScreenListNoSSR = dynamic(() => import('../components/akyllers_phone_screen_list'), {
    ssr: false
})

const BannerListNoSSR = dynamic(() => import('../components/akyllers_banner_list'), {
    ssr: false
})

export default function Home() {
    const [currentTab, setCurrentTab] = useState("phonescreen")

    const router = useRouter()

    const handleTabChange = (event: React.FormEvent<HTMLAnchorElement>, tabName: string) => {
        setCurrentTab(tabName)
    }
    const determineTabColor = (tabName: string) => {

        if (currentTab == tabName) {
            return "inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
        } else {
            return "inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
        }
    }

    const renderList = () => {
        switch (currentTab) {
            case 'banner':
                return (
                    <BannerListNoSSR
                        name="akyller"
                        floor={1}
                        ceiling={4444}
                        cid="QmPaPyHWNcofX1uc6MzjfY4xbSNebF2mGEJ7acJheU8zmt"
                    />
                )
            case 'phonescreen':
                return (
                    <PhoneScreenListNoSSR
                        name="akyller"
                        floor={1}
                        ceiling={4444}
                        cid="QmdUMnNCkZQVgH1epDvRr52juHfMP8Ts6gHTBUst3zZtZ1"
                    />
                )
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
                            onClick={(e) => handleTabChange(e, "banner")}
                            className={determineTabColor("framePhone")}>
                            Banner
                        </a>
                    </li>
                </ul>
            </div>
            {renderList()}
        </div>
    )
}