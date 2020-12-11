import { map } from "lodash"
import { readJson } from "~/data/utils"
import { dataFile } from "~/paths"
import { NormalizedDoodle } from "~/types/NormalizedDoodle"
import { normalizeStrings } from "./utils"

export const doodles = readJson<NormalizedDoodle[]>(dataFile)

export const types = normalizeStrings(map(doodles, "type"))
export const countries = normalizeStrings(map(doodles, "countries").flat())
export const tags = normalizeStrings(map(doodles, "tags").flat())
