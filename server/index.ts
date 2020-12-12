import { ApolloServer } from "apollo-server"
import LoggerPlugin, { consoleLogger } from "./LoggerPlugin"
import { doodleResolver, doodleTypeDef } from "./models/Doodle"
import { filtersResolver, filtersTypeDef } from "./models/Filters"
import { queryResolver, queryTypeDef } from "./models/Query"

const ip = process.env.IP!
const port = parseInt(process.env.PORT!)

const server = new ApolloServer({
  typeDefs: [doodleTypeDef, filtersTypeDef, queryTypeDef],
  resolvers: {
    Doodle: doodleResolver,
    Filters: filtersResolver,
    Query: queryResolver,
  },
  plugins: [new LoggerPlugin()],
  logger: consoleLogger,
})

server.listen({ ip, port }).then(({ url }) => {
  consoleLogger.info(`server started @ ${url}`)
})
