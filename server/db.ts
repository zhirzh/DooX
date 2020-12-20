import { map, uniq } from 'lodash'
import { readJson } from '~data/utils'
import { dataFile } from '~paths'
import { DoodleType, NormalizedDoodle } from '~types/NormalizedDoodle'

export const doodles = readJson<NormalizedDoodle[]>(dataFile)

const normalizeStrings = (strings: string[]) => uniq(strings.sort())

export const types = normalizeStrings(map(doodles, 'type')) as DoodleType[]
export const countries = normalizeStrings(map(doodles, 'countries').flat())
export const tags = normalizeStrings(map(doodles, 'tags').flat())
