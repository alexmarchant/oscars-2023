import { OscarData } from './process-json'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

const targetFilePath = resolve(__dirname, '..', '..', '..', 'client', 'src', 'data', 'raw-oscars.json')

const jsonOscarData = JSON.stringify(OscarData, null, 2)

writeFileSync(targetFilePath, jsonOscarData)