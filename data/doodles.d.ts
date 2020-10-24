export type DoodleId = string

export type DoodleOverrideKey = 'historyDoodles' | 'nextDoodle' | 'prevDoodle' | 'relatedDoodles'

export type Doodle = Omit<NormalizedDoodle, DoodleOverrideKey> & {
  historyDoodles: Doodle[]
  nextDoodle: Doodle | null // null for latest doodle
  prevDoodle: Doodle | null // null for oldest doodle
  relatedDoodles: Doodle[]
}

export type NormalizedDoodleOverrideKey =
  | 'doodle_type'
  | 'history_doodles'
  | 'id'
  | 'next_doodle'
  | 'prev_doodle'
  | 'related_doodles'
  | 'run_date_array'

export type DoodleType = 'interactive' | 'simple' | 'slideshow' | 'video'

export type NormalizedDoodle = Omit<GoogleDoodle, NormalizedDoodleOverrideKey> & {
  date: string
  historyDoodles: DoodleId[]
  id: DoodleId
  relatedDoodles: DoodleId[]
  type: DoodleType

  gid: GoogleDoodle['id']
  nextDoodle: DoodleId | null // null for latest doodle
  prevDoodle: DoodleId | null // null for oldest doodle
}

export type GoogleDoodle = {
  alternate_url: string
  blog_text: string
  call_to_action_image_url: string
  collection_id: number
  countries: string[]
  doodle_args: DoodleArg[]
  doodle_type: GoogleDoodleType
  height: number
  high_res_height: number
  high_res_url: string
  high_res_width: number
  history_doodles: HistoryDoodle[]
  is_animated_gif: boolean
  is_dynamic: boolean
  is_global: boolean
  is_highlighted: boolean
  name: string
  persistent_id: number
  query: string
  related_doodles: RelatedDoodle[]
  run_date_array: RunDateArray
  share_text: string
  standalone_html: string
  tags: string[]
  title: string
  translated_blog_posts: TranslatedBlogPosts
  translations: Translations
  url: string
  width: number
  youtube_id: string

  id: number | null
  next_doodle: SiblingDoodle | null
  prev_doodle: SiblingDoodle | null
}

export type GoogleDoodleType =
  | 'animated'
  | 'inline interactive'
  | 'interactive'
  | 'random'
  | 'simple'
  | 'slideshow'
  | 'video template'

type RunDateArray = [number, number, number] // [year, month+1, date]

type DoodleArg = {
  name: string
  value: string
}

type HistoryDoodle = PrimaryHistoryDoodle | AlternateHistoryDoodle

type PrimaryHistoryDoodle = {
  alternate_url: string
  high_res_height: number
  high_res_url: string
  high_res_width: number
  name: string
  query: string
  run_date_array: RunDateArray
  share_text: string
  title: string
  translated_blog_posts: TranslatedBlogPosts
  translations: Translations
  url: string
}

type AlternateHistoryDoodle = {
  background_color: string
  call_to_action_image_url: string
  cta_slot_id: number
  disable_interactive: boolean
  doodle_type: string
  height: number
  name: string
  query: string
  run_date: string
  share_text: string
  slot_id: number
  standalone_html: string
  title: string
  url: string
  width: number
  youtube_id: string

  id: number | null
}

type SiblingDoodle = {
  alternate_url: string
  high_res_height: number
  high_res_url: string
  high_res_width: number
  name: string
  run_date_array: RunDateArray
  title: string
  translated_blog_posts: TranslatedBlogPosts
  translations: Translations
  url: string
}

type RelatedDoodle = {
  alternate_url: string
  high_res_height: number
  high_res_url: string
  high_res_width: number
  name: string
  query: string
  run_date_array: RunDateArray
  share_text: string
  title: string
  translated_blog_posts: TranslatedBlogPosts
  translations: Translations
  url: string
}

type Translations = {
  [key: string]: {
    share_text: string

    hover_text: string | null
    query: string | null
  }
}

type TranslatedBlogPosts = {
  [key: string]: {
    blog_post: string
    language: string
  }
}
