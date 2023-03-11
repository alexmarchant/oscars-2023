import nytBallot from './json/nyt-ballot.json'
import nytImagesImport from './json/nyt-images.json'
import { parse } from 'url'
import { basename } from 'path'

const entitiesById = nytBallot.entitiesById as any
const nytImages = nytImagesImport as any

export interface IOscarData {
  categories: Category[]
}

export interface Category {
  name: string
  hasImages: boolean
  nominees: Nominee[]
}

export interface Nominee {
  name: string
  movie?: string
  image?: NomineeImage
}

export interface NomineeImage {
  newURL: string
  originalURL: string
}

export const OscarData: IOscarData = {
  categories: [],
}

function getEntityProperty<T>(entity: any, prop: string): T | undefined {
  for (const childId of entity.entities) {
    const childEnt = entitiesById[childId]
    if (childEnt?.data?.className === prop) {
      return childEnt.data.content
    }
  }
}

function getNomineeListEnt(entity: any): any {
  for (const id of entity.entities) {
    const listEnt = entitiesById[id]
    if (listEnt.type === 'multiple_choice_question') {
      return listEnt
    }
  }
  throw new Error('Nominee list ent not found')
}

function getNomineeImage(nomineeEnt: any): NomineeImage | undefined {
  const nomineeId = nomineeEnt.id
  const imageData = imageMap[nomineeId]
  if (!imageData) return

  const crop = imageData.crops.find((crop: any) => crop.type === 'master495')
  const originalURL = `${imageData.host}${crop.content}`
  const filename = basename(parse(crop.content).pathname ?? '')
  const gifFilename = filename.replace('jpg', 'gif')
  const newURL = `/nominee-images/${gifFilename}`

  return {
    newURL,
    originalURL,
  }
}

const imageMap: Record<string, any> = {}

for (const id in entitiesById) {
  const entity = entitiesById[id]
  if (entity.type === 'image') {
    const scoopId = entity.data.scoop_id
    const nomineeId = entity.data.nomineeId
    imageMap[nomineeId] = nytImages[scoopId]
  }
}

for (const entityId of entitiesById['quiz-1'].entities) {
  // Get category
  const entity = entitiesById[entityId]
  if (entity.type !== 'category') {
    continue
  }

  // Use later
  let hasImages = false

  // Get name
  const categoryName = getEntityProperty<string>(entity, 'category-title')!

  // Noiminess
  const nominees: Nominee[] = []
  const nomineeListEnt = getNomineeListEnt(entity)
  for (const nomineeId of nomineeListEnt.entities) {
    const nomineeEnt = entitiesById[nomineeId]
    if (nomineeEnt.type !== 'nominee') continue

    // Get name
    const nomineeName = getEntityProperty<string>(nomineeEnt, 'nominee-name')!

    // Get movie
    const movie = getEntityProperty<string>(nomineeEnt, 'nominee-film')

    // Get imageURL
    const image = getNomineeImage(nomineeEnt)
    if (image) {
      hasImages = true
    }
    
    nominees.push({
      name: nomineeName,
      movie,
      image,
    })
  }


  OscarData.categories.push({
    name: categoryName,
    hasImages,
    nominees,
  })
}
