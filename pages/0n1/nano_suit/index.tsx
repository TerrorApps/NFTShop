import { useState } from 'react'
import _ from "lodash"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const NanoListNoSSR = dynamic(() => import('../../components/list/nano_suit_square_list'), {
    ssr: false
})

export default function Home() {
    const [currentTab, setCurrentTab] = useState("phonescreen")

    return (
        <div>
            <NanoListNoSSR
                        name="0n1"
                        floor={1}
                        ceiling={7777}
                        cid="QmWeHWkF9gwkgvdoKJKjsCkegZGFe281vzFmgYyYvM17bx"
                        fileName="nano_suit"
                    />
        </div>
    )
}