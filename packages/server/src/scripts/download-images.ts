import { OscarData } from './process-json'
import { image } from 'image-downloader'
import { resolve } from 'path'

const destination = resolve(__dirname, 'images')

const promises: Promise<any>[] = []

for (const category of OscarData.categories) {
  for (const nominee of category.nominees) {
    if (nominee.image?.originalURL) {
      promises.push(image({
        url: nominee.image?.originalURL,
        dest: destination,
        extractFilename: true,
      }))
    }
  }
}

Promise.all(promises)
  .then(() => console.log('done'))
