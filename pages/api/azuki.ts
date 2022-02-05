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
  if (Number(tokenId) > 9999 || Number(tokenId) < 1) {
      console.log("its invalid")
      res.status(400).end()
  } else {
    var fileName = `${tmpdir}/azuki_${tokenId}.png`
    var imageUrl = `https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${tokenId}.png`
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
        console.log("sharping azuki")
        var logoFilePath = path.resolve('.', 'assets/azuki_logo.svg')
        var logo = await sharp(logoFilePath).png().toBuffer()
        console.log("found logo grey")
        var bannerFilePath = path.resolve('.', 'assets/0n1-banner-overlay.png')
        var banner = await sharp(bannerFilePath).resize({
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
        left: 75
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
}
