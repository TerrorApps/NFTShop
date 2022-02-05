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
  if (Number(tokenId) > 7777 || Number(tokenId) < 1) {
      console.log("its invalid")
      res.status(400).end()
  } else {
    var fileName = `${tmpdir}/azuki_${tokenId}.png`
    var traitsRes = await fetch(`https://gateway.pinata.cloud/ipfs/QmR5NAV7vCi5oobK2wKNKcM5QAyCCzCg2wysZXwhCYbBLs/${tokenId}`)
    var traitsData = await traitsRes.json()
    var imageUrl = traitsData["image"]
    await Jimp.read(imageUrl, async function (err, image) {
        console.log("finding image color")
        var hex = image.getPixelColor(1, 1)
        var rgb = Jimp.intToRGBA(hex)
        var background = {r: rgb.r, g: rgb.g, b: rgb.b }

        var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
        var buffer = input.data as Buffer
        var killergf = await sharp(buffer).resize({
        fit: sharp.fit.contain,
        width: 866,
        height: 1874,
        background: background
        }).toBuffer()
        console.log("sharping azuki")
        var logoFilePath = path.resolve('.', 'assets/logo.c6f172e5.png')
        var logo = await sharp(logoFilePath).resize({
            fit: sharp.fit.contain,
            width: 800,
            height: 200,
            background: background
        }).png().toBuffer()
        await sharp({
        create: {
            width: 866,
            height: 1874,
            channels: 4,
            background: background
        }
        }).png() //5569
        .composite([{
        input: killergf,
        top: 490,
        left: 0,
        },
        {
        input: logo,
        top: 600,
        left: 25
        }
        ]).png().toFile(fileName)

        console.log("sharp created image")
        
        var stat = fileSystem.statSync(fileName);
        res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
        });
        console.log("set file content lenght")
        var readStream = fileSystem.createReadStream(fileName);
        readStream.pipe(res);
        console.log("finished file stuff")
        res.status(200)
    })
  }
}
