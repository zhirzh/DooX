import { map } from "lodash"
import { NormalizedDoodle } from "~/data/doodles"
import { readJson } from "~/data/utils"
import { dataFile } from "~/paths"
import { normalizeStrings } from "./utils"

export const doodles = readJson<NormalizedDoodle[]>(dataFile)

export const types = normalizeStrings(map(doodles, "type"))
export const countries = normalizeStrings(map(doodles, "countries").flat())
export const tags = normalizeStrings(map(doodles, "tags").flat())
