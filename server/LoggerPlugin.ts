import { ApolloServerPlugin, GraphQLRequestListener } from "apollo-server-plugin-base"
import { GraphQLRequestContext, Logger } from "apollo-server-types"
import { stripIgnoredCharacters } from "graphql"
import { v4 as uuid } from "uuid"

export const consoleLogger: Logger = {
  debug: msg => console.debug(`DEBUG ${new Date().toISOString()} ${msg}`),
  info: msg => console.info(`INFO ${new Date().toISOString()} ${msg}`),
  warn: msg => console.warn(`WARN ${new Date().toISOString()} ${msg}`),
  error: msg => console.error(`ERROR ${new Date().toISOString()} ${msg}`),
}

export default class LoggerPlugin implements ApolloServerPlugin {
  static logger = consoleLogger

  requestDidStart({ logger, request }: GraphQLRequestContext) {
    const { query, variables } = request

    if (!query || query.startsWith("query IntrospectionQuery")) {
      return
    }

    const requestId = uuid()

    logger.info(`${requestId} ${stripIgnoredCharacters(query)} ${JSON.stringify(variables)}`)

    const listener: GraphQLRequestListener = {
      didEncounterErrors({ errors }) {
        logger.error(`${requestId} ${JSON.stringify(errors)}`)
      },
    }

    return listener
  }
}
