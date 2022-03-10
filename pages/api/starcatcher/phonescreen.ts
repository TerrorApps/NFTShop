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
    var fileName = `${tmpdir}/star_phonescreen_${tokenId}.png`
    // var fileName = `azuki/azuki_phonescreen_${req.query["tokenId"]}.png`

    var imageUrl = `https://gateway.pinata.cloud/ipfs/QmRMJzqiqsfjY3NkhvwWH177VDR3ZYgfiiXZBvHfY8RxKQ/${tokenId}.webp`
    var removeLeadingZero = +tokenId    
    // var traitsRes = await fetch(`https://ipfs.io/ipfs/QmQGQU13hzouofHiMbXSstFJJxAkr6kgfahaxBtZFG8PEn/${removeLeadingZero}`)
    // var traitsData = await traitsRes.json()
    // var imageUrl = traitsData["external_url"]
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
    console.log("yo")

    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      fit: sharp.fit.contain,
      width: 585,
      height: 1266,
    }).toBuffer()
    console.log("getting logo")
    // var logoFilePath = path.resolve('.', 'assets/0N1_logo_grey.svg')
    // var logo = await sharp(logoFilePath).resize({
    //   fit: sharp.fit.contain,
    //   width: 275,
    //   height: 275
    // })
    // .png().toBuffer()
    console.log("getting banner")
    // var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
    // var banner = await sharp(bannerFilePath).resize({
    //   fit: sharp.fit.contain,
    //   width: 585
    // }).png().toBuffer()
    console.log("getting background color")
    await Jimp.read(buffer, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
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
        top: 0,
        left: 0,
      },
    //   {
    //     input: logo,
    //     top: 325,
    //     left: 150
    //   },
    //   {
    //     input: banner,
    //     gravity: "south"
    //   }
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
