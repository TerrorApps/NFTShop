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
    var fileName = `${tmpdir}/0n1_phonescreen_${tokenId}.png`
    // var fileName = `azuki/azuki_phonescreen_${req.query["tokenId"]}.png`

    var imageUrl = `http://ipfs.io/ipfs/QmXU7jJXCpkeyi2dN5im4CvnJFRJqgzko77cri1uwpxMLe/${tokenId}.png`
    console.log("image url")
    console.log(imageUrl)
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})

    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
    //   fit: sharp.fit.contain,
      width: 585,
      height: 585,
    }).toBuffer()
    console.log("getting logo")
    console.log("getting banner")
    var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
    var banner = await sharp(bannerFilePath).resize({
      fit: sharp.fit.contain,
      width: 585
    }).png().toBuffer()
    console.log("getting background color")
    await Jimp.read(buffer, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
      var logoFilePath = path.resolve('.', 'assets/planktoons-logo.png')
      var logo = await sharp(logoFilePath).resize({
        fit: sharp.fit.contain,
        width: 275,
        height: 275,
        background: { r: rgb.r, g: rgb.g, b: rgb.b, alpha: 0 }
      })
      .png().toBuffer()
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
        top: 500,
        left: 0,
      },
      {
        input: logo,
        top: 100,
        left: 150
      },
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
