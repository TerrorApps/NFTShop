// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import axios from 'axios'
import fileSystem from 'fs'
import Jimp from 'jimp'
import path, { resolve } from 'path'
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
  if (tokenId.length < 4) {
    for (let i = tokenId.length; i < 4; i++) {
      tokenId = "0" + tokenId
    }
  }
  if (Number(tokenId) > 7777 || Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    var imageUrl = `http://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png` 
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})

    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      fit: sharp.fit.contain,
      width: 585,
      height: 585,
    }).toBuffer()
    var tasks = [];
    for (let i = 1; i < 7; i++) {
        var token = req.query["tokenId"]
        tasks.push(doStuff(i, token, oni))
    }
    await Promise.all(tasks);
    console.log(`finished 0n1 ${tokenId}`)
    res.status(200).end()
    resolve()
  }
}

async function doStuff(index: number, tokenId: string | string[], oni: Buffer) {
    var fileName = `nano_suit_fallen/nano_suit_${tokenId}_${index}.png`
    var suit_png = path.resolve('.', `assets/nano_suit/NAN0_0${index}.png`)
    var suit1 = await sharp(suit_png).resize({
        fit: sharp.fit.contain,
        width: 585,
        height: 585
      })
      .flop()
      .png().toBuffer()
    await sharp(oni)
        .composite([{
            input: suit1,
        }]).png().toFile(fileName)
}