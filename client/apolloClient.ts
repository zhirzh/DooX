import { ApolloClient, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import Constants from 'expo-constants'

const { ip, port } = Constants.manifest.extra

const createApolloClient = () =>
  new ApolloClient({
    uri: `http://${ip}:${port}`,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            doodles: offsetLimitPagination([
              'searchText',
              'type',
              'countries',
              'tags',
              'startDate',
              'endDate',
            ]),
          },
        },
      },
    }),
  })

export default createApolloClient
