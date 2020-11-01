import { gql } from 'apollo-server-express'
import Fuse from 'fuse.js'
import { map } from 'lodash-es'
import { DoodleType, NormalizedDoodle } from '~/data/doodles'
import { QuerySortOrder } from '~/server/types'
import { countries, doodles as latestDoodles, tags, types } from '../data'

const oldestDoodles = latestDoodles.slice().reverse()

const fuseSearchKeys: Fuse.FuseOptionKeyObject[] = [
  { name: 'tags', weight: 6 },
  { name: 'title', weight: 4 },
  { name: 'countries', weight: 1 },
]

const fuseOptions: Fuse.IFuseOptions<NormalizedDoodle> = {
  keys: fuseSearchKeys,
  shouldSort: true,
  isCaseSensitive: true,
}

const fuseIndex = Fuse.createIndex(map(fuseSearchKeys, 'name'), latestDoodles)

const latestDoodlesFuse = new Fuse(latestDoodles, fuseOptions, fuseIndex)
const oldestDoodlesFuse = new Fuse(oldestDoodles, fuseOptions, fuseIndex)

export const queryTypeDef = gql`
  enum QuerySortOrder {
    latest
    oldest
  }

  type Query {
    doodles(
      limit: Int
      offset: Int
      order: QuerySortOrder

      type: String
      countries: [String]
      tags: [String]

      searchText: String
    ): [Doodle]!

    types: [String]
    countries: [String]
    tags: [String]
  }
`

export const queryResolver = {
  doodles: (
    _: unknown,
    params: {
      offset?: number
      limit?: number
      order?: QuerySortOrder

      type?: DoodleType
      countries?: string[]
      tags?: string[]

      searchText?: string
    }
  ) => {
    const {
      offset = 0,
      limit = 1,
      order = QuerySortOrder.latest,

      type,
      countries = [],
      tags = [],

      searchText,
    } = params

    let results = order === QuerySortOrder.latest ? latestDoodles : oldestDoodles

    if (searchText) {
      const searchPool = order === QuerySortOrder.latest ? latestDoodlesFuse : oldestDoodlesFuse
      const matches = searchPool.search(searchText)
      results = map(matches, 'item')
    }

    results = results.filter(doodle => {
      const hasAllCountries = countries.every(country => doodle.countries.includes(country))
      const hasAllTags = tags.every(tags => doodle.tags.includes(tags))
      const isSameType = !type || doodle.type === type

      return hasAllCountries && hasAllTags && isSameType
    })

    return results.slice(offset, offset + limit)
  },

  types: () => types,
  countries: () => countries,
  tags: () => tags,
}