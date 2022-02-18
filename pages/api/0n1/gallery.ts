import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    var requests = Array.from(Array(10).keys())
    .map(tokenId => {
        return `https://ipfs.io/ipfs/QmXgSuLPGuxxRuAana7JdoWmaS25oAcXv3x2pYMN9kVfg3/${tokenId + 1}`
    })
    await axios
        .all(requests.map((request) => axios.get(request)))
        .then(
            (responses) => {
                responses.forEach(response => {
                    console.log(`Hello World: ${response.data}`)
                })
            }
        );
    res.status(200).json({hello: "world"})
}