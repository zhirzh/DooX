import Fuse from "fuse.js"
import { map } from "lodash"
import { QueryOrder, Resolvers } from "~/types/graphql"
import { countries, doodles, tags, types } from "../db"

const resolver: Resolvers["Query"] = {
  filters: () => ({ types, countries, tags }),

  historyDoodles: (_, args) => {
    const { month, day } = args

    return doodles.filter(doodle => {
      const doodleDate = new Date(doodle.date)
      const isSameMonth = doodleDate.getMonth() === month
      const isSameDate = doodleDate.getDate() === day

      return isSameMonth && isSameDate
    })
  },

  doodles: (_, args) => {
    const offset = args.offset ?? 0
    const limit = args.limit ?? 1
    const order = args.order ?? QueryOrder.Latest

    const { searchText, type, countries, tags } = args

    let results = !searchText ? doodles.slice() : map(fuse.search(searchText), "item")

    results = results.filter(doodle => {
      const isSameType = !type || doodle.type === type

      const hasAllCountries =
        !countries || countries.every(country => doodle.countries.includes(country))

      const hasAllTags = !tags || tags.every(tags => doodle.tags.includes(tags))

      return hasAllCountries && hasAllTags && isSameType
    })

    if (order !== QueryOrder.Latest) {
      results.reverse()
    }

    return results.slice(offset, offset + limit)
  },
}

const fuseSearchKeys: Fuse.FuseOptionKeyObject[] = [
  { name: "title", weight: 6 },
  { name: "tags", weight: 3 },
  { name: "countries", weight: 1 },
]

const fuse = new Fuse(
  doodles,
  { keys: fuseSearchKeys },
  Fuse.createIndex(map(fuseSearchKeys, "name"), doodles)
)

export default resolver
