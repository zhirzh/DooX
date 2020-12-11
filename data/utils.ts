import { readFileSync, writeFileSync } from "fs"

export const readJson = <T>(filepath: string) => {
  return JSON.parse(readFileSync(filepath, "utf-8")) as T
}

export const writeJson = (filepath: string, data: unknown) => {
  writeFileSync(filepath, JSON.stringify(data), { encoding: "utf-8" })
}
