import sharp from 'sharp'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const sourceDir = resolve(__dirname, 'images')
const destDir = resolve(__dirname, '..', '..', '..', 'client', 'public', 'nominee-images')

const promises: Promise<any>[] = []

for (const filename of readdirSync(sourceDir)) {
  const sourcePath = resolve(sourceDir, filename)
  const destPath = resolve(destDir, filename.replace('jpg', 'gif'))

  const promise = sharp(sourcePath)
    .resize(250, 250, { fit: 'inside' })
    .gif({
      dither: 1,
      colors: 9,
    })
    // .jpeg({
    //   quality: 30,
    // })
    .toFile(destPath)

  promises.push(promise)
}

Promise.all(promises)
  .then(() => console.log('done'))