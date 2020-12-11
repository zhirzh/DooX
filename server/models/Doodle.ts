import { gql } from "apollo-server"
import { matchesProperty } from "lodash"
import { Resolvers } from "~/types/graphql"
import { doodles } from "../db"
import { normalizeSimpleMap } from "../utils"

export const doodleTypeDef = gql`
  # Overriden with "DoodleType" in "~/types/NormalizedDoodle.ts"
  scalar DoodleType

  type Doodle {
    id: ID!
    gid: Int
    alternate_url: String!
    blog_text: String!
    call_to_action_image_url: String!
    collection_id: Int!
    countries: [String!]!
    date: String!
    doodle_args: [DoodleArg!]!
    height: Int!
    high_res_height: Int!
    high_res_url: String!
    high_res_width: Int!
    history_doodles: [Doodle!]!
    is_animated_gif: Boolean!
    is_dynamic: Boolean!
    is_global: Boolean!
    is_highlighted: Boolean!
    name: String!
    next_doodle: Doodle
    persistent_id: Int!
    prev_doodle: Doodle
    query: String!
    related_doodles: [Doodle!]!
    share_text: String!
    standalone_html: String!
    tags: [String!]!
    title: String!
    translated_blog_posts: [TranslatedBlogPost!]!
    translations: [Translation!]!
    type: DoodleType!
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

export const doodleResolver: Partial<Resolvers["Doodle"]> = {
  next_doodle: doodle => doodles.find(matchesProperty("id", doodle.next_doodle)) || null,

  prev_doodle: doodle => doodles.find(matchesProperty("id", doodle.prev_doodle)) || null,

  history_doodles: doodle =>
    doodle.history_doodles.map(id => doodles.find(matchesProperty("id", id))!),

  related_doodles: doodle =>
    doodle.related_doodles.map(id => doodles.find(matchesProperty("id", id))!),

  translated_blog_posts: doodle => normalizeSimpleMap(doodle.translated_blog_posts),

  translations: doodle => normalizeSimpleMap(doodle.translations),
}
