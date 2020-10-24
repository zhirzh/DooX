import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import LoggerPlugin from './LoggerPlugin'
import { doodleResolver, doodleTypeDef } from './models/Doodle'
import { queryResolver, queryTypeDef } from './models/Query'

const ip = process.env.IP!
const port = parseInt(process.env.PORT!)

const app = express()

const apolloServer = new ApolloServer({
  typeDefs: [doodleTypeDef, queryTypeDef],
  resolvers: {
    Doodle: doodleResolver,
    Query: queryResolver,
  },
  plugins: [new LoggerPlugin()],
  logger: LoggerPlugin.logger,
})

apolloServer.applyMiddleware({ app })

app.listen(port, ip, () => {
  console.log(`server started: ${ip}:${port}`)
})
