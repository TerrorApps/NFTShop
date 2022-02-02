// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import canvas, { Canvas, createCanvas } from 'canvas'
import axios from 'axios'
import { getPaletteFromURL } from 'color-thief-node'
import fileSystem from 'fs'
import path from 'path'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var tokenId = req.query["tokenId"]
  if (tokenId.length < 4) {
    for (let i = tokenId.length; i < 4; i++) {
      tokenId = "0" + tokenId
    }
  }
  console.log("token id")
  console.log(tokenId)
  var input = await axios(
    {url: `https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`,
    responseType: "arraybuffer"})
  var buffer = input.data as Buffer
  var oni = await sharp(buffer).resize({
    fit: sharp.fit.contain,
    width: 1170,
    height: 1170,
    background: { r: 243, g: 243, b: 4 }
  }).toBuffer()
  var logo = await sharp("0N1_logo_grey.svg").png().toBuffer()
  var banner = await sharp("0n1-banner-overlay.png").resize({
    fit: sharp.fit.contain,
    width: 1170
  })

  .png().toBuffer()
  var colorPalete = await getPaletteFromURL(`https://ipfs.io/ipfs/QmcoavNZq2jyZGe2Zi4nanQqzU9hRPxunHAo8pgYZ5fSep/${tokenId}.png`)
  var rgb = colorPalete[1]
  console.log(rgb)
  if (rgb[0] == 223 && rgb[1] === 223 && rgb[2] == 223) {
    rgb = [245, 245, 245]
  } else if (rgb[0] == 102 && rgb[1] == 102 && rgb[2] == 102) {
    rgb = colorPalete[1]
  }
  var background = await sharp({
    create: {
      width: 1170,
      height: 2532,
      channels: 4,
      background: { r: rgb[0], g: rgb[1], b: rgb[2] }
    }
  }).png()
  .composite([{
    input: oni,
    bot: 0,
    top: 1370,
    left: 0,
    right: 0,
    channels: 4
  },
  {
    input: logo,
    top: 750,
    left: 300
  },
  {
    input: banner,
    gravity: "south"
  }
]).png().toFile("on1.png")
  
  var stat = fileSystem.statSync('on1.png');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': stat.size
});
  var readStream = fileSystem.createReadStream('on1.png');
// We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
}
