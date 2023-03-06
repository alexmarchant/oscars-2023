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

function getNomineeListEnt(entity: any): any {
  for (const id of entity.entities) {
    const listEnt = entitiesById[id]
    if (listEnt.type === 'multiple_choice_question') {
      return listEnt
    }
  }
  throw new Error('Nominee list ent not found')
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
  const nomineeListEnt = getNomineeListEnt(entity)
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

const jsonOscarData = JSON.stringify(oscarData, null, 2)
console.log(jsonOscarData)

writeFileSync(targetFilePath, jsonOscarData)
