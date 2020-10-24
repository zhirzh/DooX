import { createHash } from 'crypto'
import { readdirSync } from 'fs'
import { omit, orderBy } from 'lodash-es'
import { join } from 'path'
import { dataFile, dumpDir, dumpFile } from '~/paths'
import { DoodleType, GoogleDoodle, NormalizedDoodle, NormalizedDoodleOverrideKey } from './doodles'
import { readJson, writeJson } from './utils'

const getDoodleId = ({ name, url }: Pick<GoogleDoodle, 'name' | 'url'>) => {
  return createHash('md5').update(`${name}:${url}`).digest('hex').slice(0, 10)
}

const getDoodleDate = (doodle: GoogleDoodle) => {
  return doodle.run_date_array.join('-')
}

const getDoodleType = (doodle: GoogleDoodle): DoodleType => {
  /**
   * all `video` doodles have nonempty `youtube_id`
   */
  if (doodle.youtube_id !== '') {
    return 'video'
  }

  /**
   * all `slideshow` doodles have `doodle_type === 'slideshow'`
   * also, all `slideshow` doodles have nonempty `standalone_html` that includes '/slideshow.html'
   */
  if (doodle.doodle_type === 'slideshow') {
    return 'slideshow'
  }

  /**
   * all doodles with nonempty `standalone_html` that don't include '/slideshow.html' are `interactive` doodles
   * extra `interactive` doodles are listed in `extraInteractiveDoodles`
   */
  if (
    (doodle.standalone_html !== '' && !doodle.standalone_html.includes('/slideshow.html')) ||
    extraInteractiveDoodles[doodle.name]
  ) {
    return 'interactive'
  }

  return 'simple'
}

const getNormalizedGoogleUrl = (url: string) => {
  if (!url) {
    return ''
  }

  /**
   * doodle URLs start with:
   *   - '/logos'
   *   - '//www.google.com'
   *   - 'https://lh3.googleusercontent.com'
   *
   * relative URLs are resolved with base 'https://www.google.com'
   * URLs with origin `https://lh3.googleusercontent.com` are returned unchanged
   */

  return new URL(url, 'https://www.google.com').href
}

const getNormalizedDoodleUrls = (doodle: GoogleDoodle) => {
  const urlKeys = ['url', 'high_res_url', 'alternate_url', 'call_to_action_image_url'] as const

  type UrlKeys = typeof urlKeys[number]

  type Urls = {
    [K in UrlKeys]: NormalizedDoodle[K]
  }

  const result = {} as Urls

  urlKeys.forEach(k => {
    const url = doodle[k]
    if (!url) {
      return
    }

    result[k] = getNormalizedGoogleUrl(url)
  })

  return result
}

export default () => {
  console.log('aggregate')

  // ordered by latest first
  const googleDoodles = orderBy(
    readdirSync(dumpDir)
      .map(filename => readJson<GoogleDoodle[]>(join(dumpDir, filename)))
      .flat(),

    ({ run_date_array }) => {
      const [year, month1, date] = run_date_array
      return new Date(year, month1 - 1, date)
    },

    'desc'
  )

  writeJson(dumpFile, googleDoodles)

  const doodleOverrideKeys: NormalizedDoodleOverrideKey[] = [
    'id',
    'doodle_type',
    'run_date_array',
    'next_doodle',
    'prev_doodle',
    'history_doodles',
    'related_doodles',
  ]

  const doodles: NormalizedDoodle[] = googleDoodles.map(doodle => {
    const {
      name,
      next_doodle,
      prev_doodle,
      history_doodles,
      related_doodles,
      standalone_html,
    } = doodle

    const omittedDoodle = omit(doodle, doodleOverrideKeys)

    return {
      ...omittedDoodle,

      ...getNormalizedDoodleUrls(doodle),

      gid: doodle.id,
      id: getDoodleId(doodle),
      date: getDoodleDate(doodle),
      type: getDoodleType(doodle),

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
  '100th-anniversary-of-the-crossword-puzzle': '/logos/2013/crossword/crossword13.html',
  '25th-anniversary-of-buckyball': '/logos/buckyball.html',
  '60th-anniversary-of-stanislaw-lems-first-publication': '/logos/lem',
  'john-steinbecks-112th-birthday': '/logos/2014/steinbeck/steinbeck14.html',
  'leo-tolstoys-186th-birthday': '/logos/2014/tolstoy/tolstoy14.html',
  'rubiks-cube': '/logos/2014/rubiks/iframe',
  'thanksgiving-2011': '/logos/2011/thanksgiving.html',
  zamboni: '/logos/2013/zamboni.html',
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
 * doodles with nonempty `standalone_html` that includes '/slideshow.html` but doesn't work
 *   - junko-tabeis-80th-birthday
 *   - lantern-festival-2018
 *   - mrinalini-sarabhais-100th-birthday
 */
