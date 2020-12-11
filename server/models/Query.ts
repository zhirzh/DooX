import { gql } from "apollo-server-express"
import Fuse from "fuse.js"
import { map } from "lodash"
import { DoodleType, NormalizedDoodle } from "~/data/doodles"
import { countries, doodles, tags, types } from "../db"

const latestDoodles = doodles
const oldestDoodles = doodles.slice().reverse()

export enum QueryOrder {
  latest = "latest",
  oldest = "oldest",
}

export const queryTypeDef = gql`
  enum QueryOrder {
    latest
    oldest
  }

  type Query {
    doodles(
      limit: Int
      offset: Int
      order: QueryOrder

      type: String
      countries: [String]
      tags: [String]

      searchText: String
    ): [Doodle]!

    filters: Filters!
  }
`

export const queryResolver = {
  doodles: (
    _: unknown,
    params: {
      offset?: number
      limit?: number
      order?: QueryOrder

      type?: DoodleType
      countries?: string[]
      tags?: string[]

      searchText?: string
    }
  ) => {
    const {
      offset = 0,
      limit = 5,
      order = QueryOrder.latest,

      type,
      countries = [],
      tags = [],

      searchText,
    } = params

    let results = order === QueryOrder.latest ? latestDoodles : oldestDoodles

    if (searchText) {
      const fuse = order === QueryOrder.latest ? latestDoodlesFuse : oldestDoodlesFuse
      const matches = fuse.search(searchText)
      results = map(matches, "item")
    }

    results = results.filter(doodle => {
      const hasAllCountries = countries.every(country => doodle.countries.includes(country))
      const hasAllTags = tags.every(tags => doodle.tags.includes(tags))
      const isSameType = !type || doodle.type === type

      return hasAllCountries && hasAllTags && isSameType
    })

    return results.slice(offset, offset + limit)
  },

  filters: () => ({
    types,
    countries,
    tags,
  }),
}

const fuseSearchKeys: Fuse.FuseOptionKeyObject[] = [
  { name: "title", weight: 6 },
  { name: "tags", weight: 3 },
  { name: "countries", weight: 1 },
]

const fuseOptions: Fuse.IFuseOptions<NormalizedDoodle> = {
  keys: fuseSearchKeys,
}

const fuseIndex = Fuse.createIndex(map(fuseSearchKeys, "name"), latestDoodles)

const latestDoodlesFuse = new Fuse(latestDoodles, fuseOptions, fuseIndex)
const oldestDoodlesFuse = new Fuse(oldestDoodles, fuseOptions, fuseIndex)
