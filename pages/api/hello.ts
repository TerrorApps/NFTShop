// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import axios from 'axios'
import fileSystem from 'fs'
import Jimp from 'jimp'

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
  var fileName = `on1_${tokenId}.png`
  var imageUrl = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
  await Jimp.read(imageUrl, async function (err, image) {
    console.log("finding image color")
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
      background: { r: 243, g: 243, b: 4 }
    }).toBuffer()
    console.log("sharping 0n1")
    var logo = await sharp("0N1_logo_grey.svg").png().toBuffer()
    console.log("found logo grey")
    var banner = await sharp("0n1-banner-overlay.png").resize({
      fit: sharp.fit.contain,
      width: 1170
    }).png().toBuffer()
    console.log("sharping banner")
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
