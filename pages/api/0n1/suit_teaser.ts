// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import axios from 'axios'
import fileSystem from 'fs'
import Jimp from 'jimp'
import path from 'path'
import { tmpdir } from 'os'
import { generate } from 'text-to-image'

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
var textImage = await generate(`#${req.query["tokenId"].toString()}`, {
  fontFamily: 'Orbitron',
  bgColor: "transparent",
  textColor: "#FFFFFF",
  fontSize: 72
});
var regex = /^data:.+\/(.+);base64,(.*)$/;

var matches = textImage.match(regex) || []
var data = matches[2]
var textImageBuffer = Buffer.from(data, 'base64')
if (Number(tokenId) > 7777 || Number(tokenId) < 1) {
    console.log("its invalid")
    res.status(400).end()
} else {
    // var fileName = `${tmpdir}/0n1_phonescreen_${tokenId}.png`
    var fileName = `0n1/0n1_suit_teaser_${req.query["tokenId"]}.png`
    var imageUrl = `http://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`
    console.log(imageUrl)
    var removeLeadingZero = +tokenId
    
    var traitsRes = await fetch(`https://ipfs.io/ipfs/QmXgSuLPGuxxRuAana7JdoWmaS25oAcXv3x2pYMN9kVfg3/${removeLeadingZero}`)
    var traitsData = await traitsRes.json()
    console.log("traits")
    console.log(traitsData)
    var type = traitsData["attributes"][0]
    console.log(traitsData["atttributes"])
    var mask = traitsData["attributes"].find((attribute: { trait_type: string, value: string}) => attribute.trait_type == "Face")

    var suit_shadow = "yokai-mask1_shadow-blur.png"
    console.log(`mask: ${mask.value}`)
    if (mask.value.includes("Plague")) {
      suit_shadow = "plague-mask_shadow-blur.png"
    } else if (mask.value.includes("Garou")) {
      suit_shadow = "garou-mask_shadow-blur.png"
    } else if (mask.value.includes("Masquerade")) {
      suit_shadow = "masquerade-mask_shadow-blur.png"
    } else if (mask.value.includes("Kitsune")) {
      suit_shadow = "kitsune-mask_shadow-blur.png"
    } else if (mask.value.includes("Mempo Mask")) {
      console.log("got here")
      suit_shadow = "mempo-mask_shadow-blur.png"
    } else if (mask.value.includes("Skull")) {
      suit_shadow = "skull-mask_shadow-blur.png"
    } else if (mask.value.includes("V-Shades")) {
      suit_shadow = "v-shades_shadow-blur.png"
    } else if (mask.value.includes("Tengu")) {
      suit_shadow = "tengu-mask_shadow-blur.png"
    } else if (mask.value.includes("Hannya")) {
      suit_shadow = "hannya-mask_shadow-blur.png"
    } else if (mask.value.includes("Gas Mask")) {
      suit_shadow = "gas_mask_shadow.png"
    } else if (mask.value.includes("PR")) {
      suit_shadow = "pr_mask-shadow.png"
    }
    var input = await axios(
        {url: imageUrl,
        responseType: "arraybuffer"})
    var buffer = input.data as Buffer
    var oni = await sharp(buffer).resize({
      fit: sharp.fit.contain,
      width: 1000,
      height: 1000,
    }).toBuffer()
    console.log("getting banner")
    var bannerFilePath = path.resolve('.', 'assets/suit-teaser-banner.png')
    var banner = await sharp(bannerFilePath).resize({
      // fit: sharp.fit.contain,
      width: 1000
    }).png().toBuffer()
    await Jimp.read(buffer, async function (err, image) {
      var hex = image.getPixelColor(1, 1)
      console.log("1")
      var rgb = Jimp.intToRGBA(hex)
      console.log("2")
      console.log("suit asset")
      console.log(suit_shadow)
      var suits_shadow = path.resolve('.', `assets/suits_shadow/${suit_shadow}`)
      var shadow = await sharp(suits_shadow).resize({
          fit: sharp.fit.contain,
          width: 1000,
          height: 1000
      })
      .ensureAlpha(0)
      .png().toBuffer()
      console.log("3")
      await sharp(oni)
      .composite([
      {
        input: shadow,
        top: 0,
        left: 75
      },
      {
        input: banner,
        gravity: "south"
      },
      {
        input: textImageBuffer,
        top: 900,
        left: 50
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
