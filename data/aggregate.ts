import { readdirSync } from "fs"
import { orderBy } from "lodash"
import { join } from "path"
import { dumpDir, dumpFile } from "~/paths"
import { GoogleDoodle } from "~/types/GoogleDoodle"
import { readJson, writeJson } from "./utils"
import { getDoodleDate } from "./utils.doodle"

export default () => {
  console.log("aggregate")

  const googleDoodles = readdirSync(dumpDir)
    .map(file => readJson<GoogleDoodle[]>(join(dumpDir, file)))
    .flat()

  // ordered by date, latest first
  writeJson(dumpFile, orderBy(googleDoodles, getDoodleDate, "desc"))
}
