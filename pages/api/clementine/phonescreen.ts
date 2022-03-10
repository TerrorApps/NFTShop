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
  if (Number(tokenId) > 5000 || Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    var fileName = `${tmpdir}/tsubasa_phonescreen_${tokenId}.png`
    // var fileName = `azuki/azuki_phonescreen_${req.query["tokenId"]}.png`

    var imageUrl = `http://ipfs.io/ipfs/QmSCpGdCSo5iDXDdGcJRWA9kcB22MdBo1xwnoMpx1nj937/${tokenId}.png`
    var removeLeadingZero = +tokenId    
    // var traitsRes = await fetch(`https://ipfs.io/ipfs/QmXgSuLPGuxxRuAana7JdoWmaS25oAcXv3x2pYMN9kVfg3/${removeLeadingZero}`)
    // var traitsData = await traitsRes.json()
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})

    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      width: 585,
      height: 1266,
    }).toBuffer()
    console.log("getting logo")
    var logoFilePath = path.resolve('.', 'assets/clementine/logo.png')
    var logo = await sharp(logoFilePath).resize({
      fit: sharp.fit.contain,
      width: 275,
      height: 275,
      background: {r:0, b:0, g:0, alpha:0}
    })
    .png().toBuffer()
    // console.log("getting banner")
    // var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
    // var banner = await sharp(bannerFilePath).resize({
    //   fit: sharp.fit.contain,
    //   width: 585
    // }).png().toBuffer()
    console.log("getting background color")
    await Jimp.read(buffer, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      var rgb = Jimp.intToRGBA(hex)
      await sharp(oni)
      .composite([{
          input: logo,
          top: 325,
          left: 150
      }])
      .png().toFile(fileName)
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
    //   {
    //     input: banner,
    //     gravity: "south"
    //   }
    //   ]).png().toFile(fileName)

      
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
