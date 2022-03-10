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
    // var fileName = `${tmpdir}/0n1_${tokenId}.png`
    var fileName = `0n1/0n1_izzy_${req.query["tokenId"]}.png`

    console.log(`saving image here ${fileName}`)
    //var removeLeadingZero = +tokenId
    var dataRes = await fetch(`https://ipfs.io/ipfs/QmXgSuLPGuxxRuAana7JdoWmaS25oAcXv3x2pYMN9kVfg3/${req.query["tokenId"]}`)
    var traitsData = await dataRes.json()
    console.log("traits")
    console.log(traitsData)
    // var imageUrl = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
    var imageAddress = traitsData["image"].split("//")[1]
    var imageUrl = `https://ipfs.io/ipfs/${imageAddress}`
    var blah = `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`

    var extra = traitsData["attributes"].find((data: { "trait_type": string }) => data.trait_type == "Extra")
    var roniTopPosition = 25
    var roniLeftPosition = 25
    var roniWidth = 550
    var roniHeight = 550

    if (extra["value"].includes('Oni')) {
        roniTopPosition = -175
        roniLeftPosition = 100
        roniWidth = 325
        roniHeight = 325
    }

    await Jimp.read(imageUrl, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
      var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
      var buffer = input.data as Buffer
      var logoFilePath = path.resolve('.', 'assets/1Z-Z1-r0n1.png')
      var roni = await sharp(logoFilePath).resize({
          fit: sharp.fit.contain,
          width: roniWidth,
          height: roniHeight,
      })
      .png().toBuffer()
      var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
      var banner = await sharp(bannerFilePath).resize({
        fit: sharp.fit.contain,
        width: 585
      }).png().toBuffer()
      await sharp(buffer).resize({
        fit: sharp.fit.contain,
        width: 585,
        height: 585,
        background: { r: rgb.r, g: rgb.g, b: rgb.b }
      }).png()
      .composite([
      {
        input: roni,
        top: roniTopPosition,
        left: roniLeftPosition
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
