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
  if (Number(tokenId) > 9999 || Number(tokenId) < 0) {
    console.log("its invalid")
    res.status(400).end()
} else {
    // var fileName = `${tmpdir}/0n1_phonescreen_${tokenId}.png`
    var fileName = `pxn/phonescreen_${req.query["tokenId"]}.png`

    //var imageUrl = `http://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
    var imageUrl = `https://assets.pxn.app/nfts/${tokenId}.png`
    var removeLeadingZero = +tokenId    
    var traitsRes = await fetch(`https://assets.pxn.app/nfts/${req.query["tokenId"]}.json`)
    var traitsData = await traitsRes.json()
    var regiment = traitsData["attributes"].find((data: { "trait_type": string }) => data.trait_type == "Regiment")
    var background = traitsData["attributes"].find((data: { "trait_type": string }) => data.trait_type == "Background")
    console.log(`regiment: ${regiment.value}`)
    console.log(`background: ${background.value}`)
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})

    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      fit: sharp.fit.contain,
      width: 585,
      height: 585,
    }).toBuffer()
    console.log("getting banner")
    var logoPath = path.resolve('.', 'assets/pxn/logo.png')
    if (background.value == "Shadow Reflection") {
      logoPath = path.resolve('.', 'assets/pxn/logo_black.png')
    }
    var logo = await sharp(logoPath).rotate(-90).resize({
      fit: sharp.fit.contain,
      height: 585
    }).png().toBuffer()
    console.log("getting background color")
    await Jimp.read(oni, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
      console.log("getting logo")
      var regimentNumber = +regiment.value
      var logoFilePath = path.resolve('.', `assets/pxn/${regimentNumber}.svg`)
      var regimentLogo = await sharp(logoFilePath).resize({
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
        top: 685,
        left: 0,
      },
      {
        input: regimentLogo,
        top: 325,
        left: 150
      },
      {
          input: logo,
          top: 100,
          left: 0
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
      return res.status(200)
    })
  }
}
