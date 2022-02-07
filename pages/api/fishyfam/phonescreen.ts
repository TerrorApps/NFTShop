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
  if (tokenId.length < 4) {
    for (let i = tokenId.length; i < 4; i++) {
      tokenId = "0" + tokenId
    }
  }
  if (Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    var fileName = `${tmpdir}/0n1_${tokenId}.png`
    var uwuApiRes = await fetch(`https://herodev.mypinata.cloud/ipfs/QmTa6xTJ35NH2aUWpyAAxahP9RpbKwgEgFWE6AA8dSbmK7/${tokenId}.json`)
    var resJson = await uwuApiRes.json()
    var imageUrl = resJson["image"]

    await Jimp.read(imageUrl, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
      var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
      var buffer = input.data as Buffer
      var oni = await sharp(buffer).resize({
        fit: sharp.fit.contain,
        width: 1170,
        height: 1170,
        background: { r: rgb.r, g: rgb.g, b: rgb.b }
      }).toBuffer()
      var logoFilePath = path.resolve('.', 'assets/fishyfam_logo.png')
      var logo = await sharp(logoFilePath).png().toBuffer()
      var overlayPath = path.resolve('.', 'assets/quote-bubbles.png')
      var overlay = await sharp(overlayPath).resize({
          fit: sharp.fit.contain,
          width: 1000
      }).png().toBuffer()
      await sharp({
        create: {
          width: 1170,
          height: 2532,
          channels: 4,
          background: { r: rgb.r, g: rgb.g, b: rgb.b }
        }
      }).png()
      .composite([{
        input: oni,
        top: 1390,
        left: 35,
      },
      {
        input: logo,
        top: 1000,
        left: 300
      },
      {
        input: overlay,
        top: 900,
        left: 100
      }
    ])
    .png().toFile(fileName)

      
      var stat = fileSystem.statSync(fileName);
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
      });
      var readStream = fileSystem.createReadStream(fileName);
      readStream.pipe(res);
      res.status(200)
    })
  }
}
