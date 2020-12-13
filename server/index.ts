import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadTypedefsSync } from "@graphql-tools/load"
import { ApolloServer } from "apollo-server"
import LoggerPlugin, { consoleLogger } from "./LoggerPlugin"
import doodleResolver from "./resolvers/Doodle"
import queryResolver from "./resolvers/Query"

const ip = process.env.IP!
const port = parseInt(process.env.PORT!)

const typeDefs = loadTypedefsSync("graphql/schema/**/*", {
  loaders: [new GraphQLFileLoader()],
})

const server = new ApolloServer({
  typeDefs: typeDefs.map(source => source.document!),
  resolvers: {
    Doodle: doodleResolver,
    Query: queryResolver,
  },
  plugins: [new LoggerPlugin()],
  logger: consoleLogger,
})

server.listen({ ip, port }).then(({ url }) => {
  consoleLogger.info(`server started @ ${url}`)
})
