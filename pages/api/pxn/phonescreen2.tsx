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
    // var fileName = `${tmpdir}/0n1_phonescreen_${tokenId}.png`
    var fileName = `pxn/phonescreen2_${req.query["tokenId"]}.png`

    //var imageUrl = `http://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
    var imageUrl = `https://assets.pxn.app/nfts/${tokenId}.png`
    var removeLeadingZero = +tokenId    
    var traitsRes = await fetch(`https://assets.pxn.app/nfts/${req.query["tokenId"]}.json`)
    var traitsData = await traitsRes.json()
    var regiment = traitsData["attributes"].find((data: { "trait_type": string }) => data.trait_type == "Regiment")
    console.log(`regiment: ${regiment.value}`)
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})

    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      fit: sharp.fit.contain,
      width: 585,
      height: 585,
    }).toBuffer()
    // console.log("getting logo")
    var logoFilePath = path.resolve('.', `assets/pxn/${regiment.value}.svg`)
    var logo = await sharp(logoFilePath).resize({
      fit: sharp.fit.contain,
      width: 275,
      height: 275
    })
    .png().toBuffer()
    console.log("getting banner")
    // var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
    // var banner = await sharp(bannerFilePath).resize({
    //   fit: sharp.fit.contain,
    //   width: 585
    // }).png().toBuffer()
    console.log("getting background color")
    await Jimp.read(oni, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
      await sharp(oni)
    //   .composite([{
    //     input: oni,
    //     top: 685,
    //     left: 0,
    //   },
    //   {
    //     input: logo,
    //     top: 325,
    //     left: 150
    //   },
      // {
      //   input: banner,
      //   gravity: "south"
      // } ])
      .png().toFile(fileName)

      
      //var stat = file(res);
      res.status(200)
    })
  }
}
