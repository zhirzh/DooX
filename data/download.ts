import { addMonths, eachMonthOfInterval, startOfMonth, subMonths } from "date-fns"
import { existsSync, mkdirSync } from "fs"
import { chunk } from "lodash"
import fetch from "node-fetch"
import { join } from "path"
import { dumpDir } from "~/paths"
import { writeJson } from "./utils"

const workerCount = 10

const firstMonth = new Date(1998, 7) // 1998 August

export default async () => {
  console.log("download")

  let shouldDownloadAll = false
  if (!existsSync(dumpDir)) {
    shouldDownloadAll = true
    mkdirSync(dumpDir)
  }

  const currMonth = startOfMonth(Date.now())
  const prevMonth = subMonths(currMonth, 1)
  const nextMonth = addMonths(currMonth, 1)

  const months = eachMonthOfInterval({
    start: shouldDownloadAll ? firstMonth : prevMonth,
    end: nextMonth,
  })

  const batchSize = Math.ceil(months.length / workerCount)
  const downloadBatches = chunk(months, batchSize)

  await Promise.all(downloadBatches.map(dates => downloadMonthlyDoodles(dates)))
}

const downloadMonthlyDoodles = async (dates: Date[]) => {
  if (dates.length === 0) {
    return
  }

  const date = dates.shift()!!

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const zeroMonth = month.toString().padStart(2, "0")

  const url = `https://www.google.com/doodles/json/${year}/${zeroMonth}?full=1`
  const filename = `${year}-${zeroMonth}.json`

  console.log(filename)
  const doodles = await fetch(url).then(res => res.json())

  writeJson(join(dumpDir, filename), doodles)

  await downloadMonthlyDoodles(dates)
}
