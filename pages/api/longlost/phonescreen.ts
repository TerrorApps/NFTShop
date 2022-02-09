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
  if (Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    var fileName = `${tmpdir}/0n1_${tokenId}.png`
    var uwuApiRes = await fetch(`https://ipfs.io/ipfs/QmTH5PEHHDi7hPFPyGJjTusGurXrnXiPo3chrpwNnPkHNB/${tokenId}.json`)
    var resJson = await uwuApiRes.json()
    var imageHash = resJson["image"].split("//")[1]
    var imageUrl = `https://ipfs.io/ipfs/${imageHash}`

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
      var logoFilePath = path.resolve('.', 'assets/longlost_logo.svg')
      var logo = await sharp(logoFilePath).resize({
          fit: sharp.fit.contain,
          width: 450,
          height: 450,
          background: {r: rgb.r, g: rgb.g, b: rgb.b }
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
        left: 0,
      },
      {
        input: logo,
        top: 650,
        left: 350
      },
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
