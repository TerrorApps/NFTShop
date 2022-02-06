// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import axios from 'axios'
import fileSystem from 'fs'
import Jimp from 'jimp'
import path from 'path'
import { tmpdir } from 'os'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  sharp.cache(false);
  var tokenId = req.query["tokenId"]
  var tokenId2 = req.query["tokenId2"]
  var tokenId3 = req.query["tokenId3"]
  if (tokenId.length < 4) {
    for (let i = tokenId.length; i < 4; i++) {
      tokenId = "0" + tokenId
    }
  }
  if (tokenId2.length < 4) {
    for (let i = tokenId2.length; i < 4; i++) {
      tokenId2 = "0" + tokenId2
    }
  }
  if (tokenId3.length < 4) {
    for (let i = tokenId3.length; i < 4; i++) {
      tokenId3 = "0" + tokenId3
    }
  }
if (Number(tokenId) > 7777 || Number(tokenId) < 1 || Number(tokenId2) > 7777 || Number(tokenId2) < 1 || Number(tokenId3) > 7777 || Number(tokenId3) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    var fileName = `${tmpdir}/0n1_${tokenId}.png`
    var imageUrl = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
    var imageUrl2 = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId2}.png`
    var imageUrl3 = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId3}.png`

    await axios.all([
        axios({url: imageUrl, responseType: "arraybuffer"}),
        axios({url: imageUrl2, responseType: "arraybuffer"}),
        axios({url: imageUrl3, responseType: "arraybuffer"})
    ]).then(axios.spread(async (oni1, oni2, oni3) => {
        var oni1Buffer = oni1.data as Buffer
        var oni2Buffer = oni2.data as Buffer
        var oni3Buffer = oni3.data as Buffer

        var oniSharp = await sharp(oni1Buffer).resize({
            fit: sharp.fit.contain,
            width: 400,
            height: 400,
          }).toBuffer()

        var oni2Sharp = await sharp(oni2Buffer).resize({
            fit: sharp.fit.contain,
            width: 400,
            height: 400,
        }).toBuffer() 

        var oni3Sharp = await sharp(oni3Buffer).resize({
            fit: sharp.fit.contain,
            width: 400,
            height: 400,
        }).toBuffer()

        await sharp({
            create: {
              width: 1500,
              height: 500,
              channels: 4,
              background: { r: 0, g: 0, b: 0 }
            }
          }).png()
          .composite([{
            input: oniSharp,
            top: 50,
            left: 50,
          },
          {
            input: oni2Sharp,
            top: 50,
            left: 550,
          },
          {
            input: oni3Sharp,
            top: 50,
            left: 1050,
          },
          ]).png().toFile(fileName)

                
        var stat = fileSystem.statSync(fileName);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': stat.size
        });
        var readStream = fileSystem.createReadStream(fileName);
        readStream.pipe(res);
        res.status(200)
    }))
  }
}
