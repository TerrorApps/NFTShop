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
      res.status(400).end()
  } else {
    var fileName = `${tmpdir}/bayc_${tokenId}.png`
    var imageUrl = `https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${tokenId}.png`
    var traitRes = await fetch(`https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${tokenId}`)
    var traits = await traitRes.json()
    var imageAddress = traits["image"].split("//")[1]
    var imageUrl = `https://ipfs.io/ipfs/${imageAddress}`

    await Jimp.read(imageUrl, async function (err, image) {
        var hex = image.getPixelColor(30, 30)
        var rgb = Jimp.intToRGBA(hex)
        var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
        var buffer = input.data as Buffer
        var bayc = await sharp(buffer).resize({
        fit: sharp.fit.contain,
        width: 1170,
        height: 1170,
        background: { r: rgb.r, g: rgb.g, b: rgb.b }
        }).toBuffer()
        var logoFilePath = path.resolve('.', 'assets/bayc-logo-z.png')
        var logo = await sharp(logoFilePath).resize({
            fit: sharp.fit.contain,
            width: 1000,
            height: 300,
            background: { r: rgb.r, g: rgb.g, b: rgb.b }
        }).png().toBuffer()
        await sharp({
        create: {
            width: 1170,
            height: 2532,
            channels: 4,
            background: { r: rgb.r, g: rgb.g, b: rgb.b }
        }
        }).png()
        .composite([{
        input: bayc,
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
