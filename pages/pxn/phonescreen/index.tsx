import _ from "lodash"
import dynamic from 'next/dynamic'

const PhoneScreenListNoSSR = dynamic(() => import('../../components/pxn_phone_screen_list'), {
    ssr: false
})

export default function Home() {
    return (
        <div>
            <div>
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <a href="#" className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Phone</a>
                    </li>
                </ul>
            </div>


        <PhoneScreenListNoSSR
            name=""
            floor={0}
            ceiling={9999}
            cid="Qmd8wxqu2qW5xui4Y7VK1aQqBBkS9K4sd41TLDFzrdp6cU"
        />
        </div>
    )
}