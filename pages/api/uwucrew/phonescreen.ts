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
  if (Number(tokenId) < 0) {
    console.log("its invalid")
    res.status(400).end()
} else {
    // var fileName = `${tmpdir}/0n1_${tokenId}.png`
    var fileName = `uwucrew/uwucrew_phonescreen_${req.query["tokenId"]}.png`
    var uwuApiRes = await fetch(`https://api.uwucrew.art/api/uwu/${tokenId}`)
    var resJson = await uwuApiRes.json()
    var imageUrl = resJson["image"]

    await Jimp.read(imageUrl, async function (err, image) {
      var hex = image.getPixelColor(1, 100)
      var rgb = Jimp.intToRGBA(hex)
      var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
      var buffer = input.data as Buffer
      var oni = await sharp(buffer).resize({
        fit: sharp.fit.contain,
        width: 585,
        height: 585,
        background: { r: rgb.r, g: rgb.g, b: rgb.b }
      }).toBuffer()
      var logoFilePath = path.resolve('.', 'assets/uwucrew_logo.svg')
      var logo = await sharp(logoFilePath).resize({
        fit: sharp.fit.contain,
        width: 275,
        height: 275,
        background: { r: rgb.r, g: rgb.g, b: rgb.b }
      }).png().toBuffer()
      await sharp({
        create: {
          width: 585,
          height: 1266,
          channels: 4,
          background: { r: rgb.r, g: rgb.g, b: rgb.b }
        }
      }).png()
      .composite([{
        input: oni,
        top: 695,
        left: 0,
      },
      {
        input: logo,
        top: 425,
        left: 150
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
