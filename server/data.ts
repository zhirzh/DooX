import { NormalizedDoodle } from '~/data/doodles'
import { readJson } from '~/data/utils'
import { dataFile } from '~/paths'
import { uniq, map } from 'lodash-es'

export const doodles = readJson<NormalizedDoodle[]>(dataFile)

export const types = uniq(map(doodles, 'type')).sort()

export const countries = uniq(map(doodles, 'countries').flat()).sort()
export const tags = uniq(map(doodles, 'tags').flat()).sort()
