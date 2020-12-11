import { join } from "path"

export const dataDir = join(__dirname, "data")
export const dataFile = join(dataDir, "data.json")

export const dumpDir = join(dataDir, "dump")
export const dumpFile = join(dataDir, "dump.json")
