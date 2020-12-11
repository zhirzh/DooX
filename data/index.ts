import aggregate from "./aggregate"
import download from "./download"
import normalize from "./normalize"

const main = async () => {
  await download()
  aggregate()
  normalize()
}

main()
