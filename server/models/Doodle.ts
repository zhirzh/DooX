import { gql } from "apollo-server-express"
import { matchesProperty } from "lodash"
import { NormalizedDoodle } from "~/data/doodles"
import { doodles } from "../db"
import { normalizeSimpleMap } from "../utils"

type DoodleOmitKeyNormalizedDoodle =
  | "historyDoodles"
  | "nextDoodle"
  | "prevDoodle"
  | "relatedDoodles"

export interface Doodle extends Omit<NormalizedDoodle, DoodleOmitKeyNormalizedDoodle> {
  nextDoodle?: Doodle // missing for latest doodle
  prevDoodle?: Doodle // missing for oldest doodle
  historyDoodles: Doodle[]
  relatedDoodles: Doodle[]
}

export const doodleTypeDef = gql`
  type Doodle {
    id: String!
    gid: Int
    alternate_url: String!
    blog_text: String!
    call_to_action_image_url: String!
    collection_id: Int!
    countries: [String]!
    date: String!
    doodle_args: [DoodleArg]!
    height: Int!
    high_res_height: Int!
    high_res_url: String!
    high_res_width: Int!
    historyDoodles: [Doodle]!
    is_animated_gif: Boolean!
    is_dynamic: Boolean!
    is_global: Boolean!
    is_highlighted: Boolean!
    name: String!
    nextDoodle: Doodle
    persistent_id: Int!
    prevDoodle: Doodle
    query: String!
    relatedDoodles: [Doodle]!
    share_text: String!
    standalone_html: String!
    tags: [String]!
    title: String!
    translated_blog_posts: [TranslatedBlogPost]!
    translations: [Translation]!
    type: String!
    url: String!
    width: Int!
    youtube_id: String!
  }

  type DoodleArg {
    name: String!
    value: String!
  }

  type Translation {
    _key: String!
    _value: _Translation!
  }

  type _Translation {
    share_text: String!
    hover_text: String
    query: String
  }

  type TranslatedBlogPost {
    _key: String!
    _value: _TranslatedBlogPost!
  }

  type _TranslatedBlogPost {
    blog_post: String!
    language: String!
  }
`

export const doodleResolver = {
  nextDoodle: (doodle: NormalizedDoodle) =>
    doodle.nextDoodle ? doodles.find(matchesProperty("id", doodle.nextDoodle)) : undefined,

  prevDoodle: (doodle: NormalizedDoodle) =>
    doodle.prevDoodle ? doodles.find(matchesProperty("id", doodle.prevDoodle)) : undefined,

  historyDoodles: (doodle: NormalizedDoodle) =>
    doodle.historyDoodles.map(id => doodles.find(matchesProperty("id", id))!),

  relatedDoodles: (doodle: NormalizedDoodle) =>
    doodle.relatedDoodles.map(id => doodles.find(matchesProperty("id", id))!),

  translated_blog_posts: (doodle: NormalizedDoodle) =>
    normalizeSimpleMap(doodle.translated_blog_posts),

  translations: (doodle: NormalizedDoodle) => normalizeSimpleMap(doodle.translations),
}
