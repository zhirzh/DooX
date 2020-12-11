export type DoodleId = string

export type DoodleType = "simple" | "interactive" | "slideshow" | "video"

export type NormalizedDoodleOmitKeyGoogleDoodle =
  | "doodle_type"
  | "history_doodles"
  | "next_doodle"
  | "prev_doodle"
  | "related_doodles"
  | "run_date_array"

export interface NormalizedDoodle extends Omit<GoogleDoodle, NormalizedDoodleOmitKeyGoogleDoodle> {
  id: DoodleId
  gid: GoogleDoodle["id"]
  date: string // ISO datestamp
  historyDoodles: DoodleId[]
  nextDoodle?: DoodleId // missing for latest doodle
  prevDoodle?: DoodleId // missing for oldest doodle
  relatedDoodles: DoodleId[]
  type: DoodleType
}

export interface GoogleDoodle {
  id?: number
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
  next_doodle?: SiblingDoodle // missing for latest doodle
  persistent_id: number
  prev_doodle?: SiblingDoodle // missing for oldest doodle
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
}

type GoogleDoodleType =
  | "animated"
  | "inline interactive"
  | "interactive"
  | "random"
  | "simple"
  | "slideshow"
  | "video template"

type RunDateArray = [number, number, number] // [year, month+1, date]

type HistoryDoodle = PrimaryHistoryDoodle | AlternateHistoryDoodle

interface PrimaryHistoryDoodle {
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

interface AlternateHistoryDoodle {
  id?: number
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
}

interface SiblingDoodle {
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

interface RelatedDoodle {
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

interface DoodleArg {
  name: string
  value: string
}

interface Translations {
  [lang: string]: {
    share_text: string
    hover_text?: string
    query?: string
  }
}

interface TranslatedBlogPosts {
  [lang: string]: {
    blog_post: string
    language: string
  }
}
