import nytBallot from './nytimes-ballot.json'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
// import imageData from './images.json'

const targetFilePath = resolve(__dirname, '..', '..', '..', 'client', 'src', 'data', 'oscars.json')

const entitiesById = nytBallot.entitiesById as any

interface OscarData {
  categories: Category[]
}

interface Category {
  name: string
  nominees: Nominee[]
}

interface Nominee {
  name: string
}

const oscarData: OscarData = {
  categories: [],
}

function getEntityName(entity: any): string {
  const nameId = entity.entities[0]
  const nameEnt = entitiesById[nameId]
  return nameEnt.data.content
}

for (const entityId of entitiesById['quiz-1'].entities) {
  // Get category
  const entity = entitiesById[entityId]
  if (entity.type !== 'category') {
    continue
  }

  // Get name
  const name = getEntityName(entity)

  // Noiminess
  const nominees: Nominee[] = []
  const nomineeListId = entity.entities[1]
  const nomineeListEnt = entitiesById[nomineeListId]
  for (const nomineeId of nomineeListEnt.entities) {
    const nomineeEnt = entitiesById[nomineeId]
    if (nomineeEnt.type !== 'nominee') continue

    // Get name
    const name = getEntityName(nomineeEnt)
    
    nominees.push({
      name,
    })
  }


  oscarData.categories.push({
    name,
    nominees,
  })
}

writeFileSync(targetFilePath, JSON.stringify(oscarData, null, 2))
