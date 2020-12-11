import { createHash } from "crypto"
import { GoogleDoodle } from "~/types/GoogleDoodle"
import { DoodleId, DoodleType } from "~/types/NormalizedDoodle"

export const getDoodleId = ({ name, url }: Pick<GoogleDoodle, "name" | "url">): DoodleId =>
  createHash("md5").update(`${name}:${url}`).digest("hex").slice(0, 10)

export const getDoodleType = (
  doodle: GoogleDoodle,
  extraInteractiveDoodlesNames: string[]
): DoodleType => {
  if (doodle.youtube_id.length > 0) {
    return "video"
  }

  if (doodle.doodle_type === "slideshow") {
    return "slideshow"
  }

  if (doodle.standalone_html.length > 0 || extraInteractiveDoodlesNames.includes(doodle.name)) {
    return "interactive"
  }

  return "simple"
}

/**
 * @returns ISO datestamp
 */
export const getDoodleDateString = (doodle: GoogleDoodle) => doodle.run_date_array.join("-")

export const getDoodleDate = (doodle: GoogleDoodle) => {
  const [year, month1, date] = doodle.run_date_array
  return new Date(year, month1 - 1, date)
}

const urlKeys = ["url", "alternate_url", "high_res_url", "call_to_action_image_url"] as const
type Urls = {
  [K in typeof urlKeys[number]]: string
}
export const getNormalizedDoodleUrls = (doodle: GoogleDoodle) => {
  const result = {} as Urls

  urlKeys.forEach(k => {
    const url = doodle[k]
    if (url.length > 0) {
      result[k] = getNormalizedGoogleUrl(url)
    }
  })

  return result
}

export const getNormalizedGoogleUrl = (url: string) => {
  if (url.length === 0) {
    return ""
  }

  /**
   * GoogleDoodle URLs start with:
   *   - '/logos'
   *   - '//www.google.com'
   *   - 'https://lh3.googleusercontent.com'
   *
   * relative URLs resolved with base 'https://www.google.com'
   * URLs with origin 'https://lh3.googleusercontent.com' returned unchanged
   */

  const { href } = new URL(url, "https://www.google.com")

  return href
}
