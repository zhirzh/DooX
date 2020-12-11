import { omit } from "lodash"
import { dataFile, dumpFile } from "~/paths"
import {
  getDoodleDateString,
  getDoodleId,
  getDoodleType,
  getNormalizedDoodleUrls,
  getNormalizedGoogleUrl,
} from "./doodle-utils"
import { GoogleDoodle, NormalizedDoodle, NormalizedDoodleOmitKeyGoogleDoodle } from "./doodles"
import { readJson, writeJson } from "./utils"

const omitKeys: NormalizedDoodleOmitKeyGoogleDoodle[] = [
  "doodle_type",
  "history_doodles",
  "next_doodle",
  "prev_doodle",
  "related_doodles",
  "run_date_array",
]

export default () => {
  console.log("normalize")

  const googleDoodles = readJson<GoogleDoodle[]>(dumpFile)

  const doodles: NormalizedDoodle[] = googleDoodles.map(doodle => {
    const {
      name,
      standalone_html,
      next_doodle,
      prev_doodle,
      history_doodles,
      related_doodles,
    } = doodle

    return {
      ...omit(doodle, omitKeys),

      gid: doodle.id,
      id: getDoodleId(doodle),
      date: getDoodleDateString(doodle),
      type: getDoodleType(doodle, Object.keys(extraInteractiveDoodles)),

      ...getNormalizedDoodleUrls(doodle),
      standalone_html: getNormalizedGoogleUrl(extraInteractiveDoodles[name] || standalone_html),

      nextDoodle: next_doodle && getDoodleId(next_doodle),
      prevDoodle: prev_doodle && getDoodleId(prev_doodle),

      historyDoodles: history_doodles.map(getDoodleId),
      relatedDoodles: related_doodles.map(getDoodleId),
    }
  })

  writeJson(dataFile, doodles)
}

const extraInteractiveDoodles: { [doodleName: string]: string } = {
  "100th-anniversary-of-the-crossword-puzzle": "/logos/2013/crossword/crossword13.html",
  "25th-anniversary-of-buckyball": "/logos/buckyball.html",
  "60th-anniversary-of-stanislaw-lems-first-publication": "/logos/lem",
  "john-steinbecks-112th-birthday": "/logos/2014/steinbeck/steinbeck14.html",
  "leo-tolstoys-186th-birthday": "/logos/2014/tolstoy/tolstoy14.html",
  "rubiks-cube": "/logos/2014/rubiks/iframe",
  "thanksgiving-2011": "/logos/2011/thanksgiving.html",
  zamboni: "/logos/2013/zamboni.html",
}

/**
 * doodles with `doodle_type === 'interactive` but no `standalone_html`
 *   - 125th-anniversary-of-the-largest-snowflake
 *   - 76th-birthday-of-roger-hargreaves
 *   - francois-truffauts-80th-birthday
 *   - gideon-sundbacks-132nd-birthday
 *   - happy-holidays-2011
 *   - happy-holidays-from-google-2010
 *   - ibn-battutas-708th-birthday
 *   - mark-twains-176th-birthday
 *   - thanksgiving-2010-by-ina-garten-part-3
 *
 * doodles with `standalone_html` that includes '/slideshow.html` but don't work
 *   - junko-tabeis-80th-birthday
 *   - lantern-festival-2018
 *   - mrinalini-sarabhais-100th-birthday
 */
