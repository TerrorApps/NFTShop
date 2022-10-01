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
  var tokenId = req.query["token"]
  if (Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    // var fileName = `${tmpdir}/akyller_${tokenId}.png`
    var phoneFileName = `blah/akyller_phone_${tokenId}.png`
    //var pfpFileName = `akyllers/akyller_pfp_${tokenId}.png`
    console.log("token id")
    console.log(tokenId)
    var uwuApiRes = await fetch(`https://regentool.mypinata.cloud/ipfs/Qmdcau9CrxGKwvJKpXApk2qpcPAfRZUUsT2kwZNp4CZQTN/${tokenId}.json`)
    //var uwuApiRes = await fetch(`https://ipfs.io/ipfs/Qmdcau9CrxGKwvJKpXApk2qpcPAfRZUUsT2kwZNp4CZQTN/1234.json`)
    var resJson = await uwuApiRes.json()
    var imageUrl = `https://regentool.mypinata.cloud/ipfs/QmdaQbgmcCyPZWSXDd2hrt5DG9LaDQ94xebCVNr36yjecn/${tokenId}.png`
    var background = resJson["attributes"].find((data: { "trait_type": string }) => data.trait_type == "Background").value
    console.log(`background: ${background}`)
    var background_logo = 'black_white_logo.png'
    if (background == "OffWhite") {
        background_logo = 'black_logo.png'
    }
    if (background == "Light Tyrian") {
        background_logo = 'black_logo.png'
    }
    if (background == "Crimson") {
        background_logo = 'black_white_logo.png'
    }
    if (background == "Tyrian") {
        background_logo = 'black_logo.png'
    }
    if (background == "Grey") {
        background_logo = 'black_white_logo.png'
    }
    if (background == "Yellow") {
        background_logo = 'black_logo.png'
    }
    if (background == "Nyx") {
        background_logo = 'black_white_logo.png'
    }

    await Jimp.read(imageUrl, async function (err, image) {
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
        background: { r: rgb.r, g: rgb.g, b: rgb.b }
      }).toBuffer()
      var logoFilePath = path.resolve('.', `assets/akyllers/${background_logo}`)
      var logo = await sharp(logoFilePath).png().resize({
        width: 700,
        height: 700
      })
      .toBuffer()
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
        top: 1390,
        left: 0,
      },
      {
        input: logo,
        top: 750,
        left: 250
      }
    ])
    .png().toFile(phoneFileName)
    //await sharp(oni).png().toFile(pfpFileName)
      // var stat = fileSystem.statSync(fileName);
      // res.writeHead(200, {
      //   'Content-Type': 'image/png',
      //   'Content-Length': stat.size
      // });
      // var readStream = fileSystem.createReadStream(fileName);
      // readStream.pipe(res);
      // res.status(200)
    res.status(200).end()
    })
    res.status(200).end()
  }
}
