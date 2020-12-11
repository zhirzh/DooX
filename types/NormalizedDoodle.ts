import { GoogleDoodle } from "./GoogleDoodle"

export interface NormalizedDoodle extends Omit<GoogleDoodle, OmitKey | OverrideKey> {
  gid: GoogleDoodle["id"]
  type: DoodleType
  date: string // ISO datestamp

  id: DoodleId
  history_doodles: DoodleId[]
  next_doodle: DoodleId | null // null for latest doodle
  prev_doodle: DoodleId | null // null for oldest doodle
  related_doodles: DoodleId[]
}

export type DoodleId = string

export type DoodleType = "simple" | "interactive" | "slideshow" | "video"

export type OmitKey = "doodle_type" | "run_date_array"

export type OverrideKey =
  | "id"
  | "history_doodles"
  | "next_doodle"
  | "prev_doodle"
  | "related_doodles"
