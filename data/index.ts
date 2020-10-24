import aggregate from './aggregate'
import download from './download'

const main = async () => {
  await download()
  aggregate()
}

main()
