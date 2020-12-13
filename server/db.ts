import { lowerCase, map, uniq } from "lodash"
import { readJson } from "~/data/utils"
import { dataFile } from "~/paths"
import { NormalizedDoodle } from "~/types/NormalizedDoodle"

export const doodles = readJson<NormalizedDoodle[]>(dataFile)

const normalizeStrings = (strings: string[]) => uniq(map(strings, lowerCase).sort())

export const types = normalizeStrings(map(doodles, "type"))
export const countries = normalizeStrings(map(doodles, "countries").flat())
export const tags = normalizeStrings(map(doodles, "tags").flat())
