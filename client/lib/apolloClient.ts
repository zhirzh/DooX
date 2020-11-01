import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import Constants from 'expo-constants'

const { IP, PORT } = Constants.manifest.extra

const createApolloClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: `http://${IP}:${PORT}/graphql` }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            doodles: offsetLimitPagination(),
          },
        },
      },
    }),
  })

export default createApolloClient
