import { matchesProperty } from "lodash"
import { Resolvers } from "~/types/graphql"
import { doodles } from "../db"
import { normalizeSimpleMap } from "../utils"

const resolver: Partial<Resolvers["Doodle"]> = {
  next_doodle: doodle => doodles.find(matchesProperty("id", doodle.next_doodle)) || null,

  prev_doodle: doodle => doodles.find(matchesProperty("id", doodle.prev_doodle)) || null,

  history_doodles: doodle =>
    doodle.history_doodles.map(id => doodles.find(matchesProperty("id", id))!),

  related_doodles: doodle =>
    doodle.related_doodles.map(id => doodles.find(matchesProperty("id", id))!),

  translated_blog_posts: doodle => normalizeSimpleMap(doodle.translated_blog_posts),

  translations: doodle => normalizeSimpleMap(doodle.translations),
}

export default resolver
