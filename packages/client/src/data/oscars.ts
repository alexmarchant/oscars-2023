import RawData from './raw-oscars.json'
import type { IOscarData } from '../../../server/src/scripts/process-json'

export type { IOscarData, Category, Nominee, NomineeImage } from '../../../server/src/scripts/process-json'

export const OscarData: IOscarData = RawData