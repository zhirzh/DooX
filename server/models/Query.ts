import { gql } from "apollo-server"
import Fuse from "fuse.js"
import { map } from "lodash"
import { QueryOrder, Resolvers } from "~/types/graphql"
import { NormalizedDoodle } from "~/types/NormalizedDoodle"
import { countries, doodles, tags, types } from "../db"

const latestDoodles = doodles
const oldestDoodles = doodles.slice().reverse()

export const queryTypeDef = gql`
  enum QueryOrder {
    Latest
    Oldest
  }

  type Query {
    doodles(
      limit: Int
      offset: Int
      order: QueryOrder

      type: String
      countries: [String!]
      tags: [String!]

      searchText: String
    ): [Doodle]!

    filters: Filters!
  }
`

export const queryResolver: Resolvers["Query"] = {
  doodles: (_, args) => {
    const offset = args.offset ?? 0
    const limit = args.limit ?? 1
    const order = args.order ?? QueryOrder.Latest

    const { type, countries, tags, searchText } = args

    let results = order === QueryOrder.Latest ? latestDoodles : oldestDoodles

    if (searchText) {
      const fuse = order === QueryOrder.Latest ? latestDoodlesFuse : oldestDoodlesFuse
      const matches = fuse.search(searchText)
      results = map(matches, "item")
    }

    results = results.filter(doodle => {
      const isSameType = !type || doodle.type === type

      const hasAllCountries =
        !countries || countries.every(country => doodle.countries.includes(country))

      const hasAllTags = !tags || tags.every(tags => doodle.tags.includes(tags))

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
