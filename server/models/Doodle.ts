import { gql } from 'apollo-server-express'
import { matchesProperty } from 'lodash-es'
import { NormalizedDoodle } from '~/data/doodles'
import { doodles } from '../data'
import { normalizeSimpleMap } from '../utils'

export const doodleTypeDef = gql`
  # NormalizedDoodle in ~/data/doodles.d.ts
  type Doodle {
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
    id: String!
    is_animated_gif: Boolean!
    is_dynamic: Boolean!
    is_global: Boolean!
    is_highlighted: Boolean!
    name: String!
    persistent_id: Int!
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

    gid: Int
    nextDoodle: Doodle
    prevDoodle: Doodle
  }

  type DoodleArg {
    name: String!
    value: String!
  }

  type Translation {
    _key: String
    _value: _Translation
  }

  type _Translation {
    share_text: String!

    hover_text: String
    query: String
  }

  type TranslatedBlogPost {
    _key: String
    _value: _TranslatedBlogPost
  }

  type _TranslatedBlogPost {
    blog_post: String!
    language: String!
  }
`

export const doodleResolver = {
  nextDoodle: (doodle: NormalizedDoodle) => {
    return doodle.nextDoodle && doodles.find(matchesProperty('id', doodle.nextDoodle))
  },

  prevDoodle: (doodle: NormalizedDoodle) => {
    return doodle.prevDoodle && doodles.find(matchesProperty('id', doodle.prevDoodle))
  },

  historyDoodles: (doodle: NormalizedDoodle) => {
    return doodle.historyDoodles.map(id => doodles.find(matchesProperty('id', id)))
  },

  relatedDoodles: (doodle: NormalizedDoodle) => {
    return doodle.relatedDoodles.map(id => doodles.find(matchesProperty('id', id)))
  },

  translated_blog_posts: (doodle: NormalizedDoodle) => {
    return normalizeSimpleMap(doodle.translated_blog_posts)
  },

  translations: (doodle: NormalizedDoodle) => {
    return normalizeSimpleMap(doodle.translations)
  },
}
