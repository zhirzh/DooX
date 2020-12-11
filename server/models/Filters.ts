import { gql } from "apollo-server"

export const filtersTypeDef = gql`
  type Filters {
    types: [String!]!
    countries: [String!]!
    tags: [String!]!
  }
`

export const filtersResolver = {}
