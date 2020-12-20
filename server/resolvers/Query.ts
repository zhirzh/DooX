import { isAfter, isBefore } from 'date-fns'
import Fuse from 'fuse.js'
import { map } from 'lodash'
import { includesAll } from '~shared/utils'
import { parseDateString } from '~shared/utils/date'
import { QueryOrder, Resolvers } from '~types/graphql'
import { countries, doodles, tags, types } from '../db'

const maxLimit = 20

const resolver: Resolvers['Query'] = {
  filters: () => ({
    types,
    countries,
    tags,
  }),

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
    const limit = clamp(args.limit ?? 1, { lo: 0, hi: maxLimit })
    const order = args.order ?? QueryOrder.Latest
    const startDate = args.startDate
    const endDate = args.endDate

    const { searchText, type, countries, tags } = args

    let results = searchText ? map(fuse.search(searchText), 'item') : doodles.slice()

    results = results.filter(
      doodle =>
        (!type || doodle.type === type) &&
        (!countries || includesAll(doodle.countries, countries)) &&
        (!tags || includesAll(doodle.tags, tags)) &&
        (!startDate || !isAfter(parseDateString(startDate), parseDateString(doodle.date))) &&
        (!endDate || !isBefore(parseDateString(endDate), parseDateString(doodle.date)))
    )

    if (order !== QueryOrder.Latest) {
      results = results.reverse()
    }

    results = results.slice(offset, offset + limit)

    return results
  },
}

const fuseSearchKeys: Fuse.FuseOptionKeyObject[] = [
  { name: 'title', weight: 6 },
  { name: 'tags', weight: 3 },
  { name: 'countries', weight: 1 },
]

const fuse = new Fuse(
  doodles,
  { keys: fuseSearchKeys },
  Fuse.createIndex(map(fuseSearchKeys, 'name'), doodles)
)

const clamp = (value: number, { lo = value, hi = value }: { lo?: number; hi?: number }) =>
  Math.max(lo, Math.min(value, hi))

export default resolver
