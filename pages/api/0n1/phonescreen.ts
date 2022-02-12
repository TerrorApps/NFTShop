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
  if (Number(tokenId) > 7777 || Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    var fileName = `${tmpdir}/0n1_${tokenId}.png`
    var imageUrl = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
    var removeLeadingZero = +tokenId
    var traitsRes = await fetch(`https://ipfs.io/ipfs/QmXgSuLPGuxxRuAana7JdoWmaS25oAcXv3x2pYMN9kVfg3/${removeLeadingZero}`)
    var traitsData = await traitsRes.json()
    console.log("traits")
    console.log(traitsData)
    var input = await axios(
      {url: imageUrl,
      responseType: "arraybuffer"})
    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      fit: sharp.fit.contain,
      width: 1170,
      height: 1170,
      background: { r: 243, g: 243, b: 4 }
    }).toBuffer()
    var logoFilePath = path.resolve('.', 'assets/0N1_logo_grey.svg')
    var logo = await sharp(logoFilePath).png().toBuffer()
    var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
    var banner = await sharp(bannerFilePath).resize({
      fit: sharp.fit.contain,
      width: 1170
    }).png().toBuffer()
    await Jimp.read(buffer, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
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
        top: 1370,
        left: 0,
      },
      {
        input: logo,
        top: 750,
        left: 300
      },
      {
        input: banner,
        gravity: "south"
      }
      ]).png().toFile(fileName)

      
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
