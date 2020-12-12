import { ApolloClient, FieldMergeFunction, FieldReadFunction, InMemoryCache } from "@apollo/client"
import Constants from "expo-constants"
import { Doodle } from "~/types/graphql"

const { ip, port } = Constants.manifest.extra

const createApolloClient = () =>
  new ApolloClient({
    uri: `http://${ip}:${port}`,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            doodles: {
              keyArgs: false,
              merge: mergeQueryDoodles,
              read: readQueryDoodles,
            },
          },
        },
      },
    }),
  })

type DoodleMapById = Map<Doodle["id"], Doodle>

const mergeQueryDoodles: FieldMergeFunction<DoodleMapById, Doodle[]> = (
  existing,
  incoming,
  { readField }
) => {
  const merged = existing ? new Map(existing as DoodleMapById) : new Map()

  incoming.forEach(doodle => {
    const id = readField("id", doodle) as string
    merged?.set(id, doodle)
  })

  return merged
}

const readQueryDoodles: FieldReadFunction<DoodleMapById, Doodle[]> = existing =>
  existing && Array.from(existing.values())

export default createApolloClient
