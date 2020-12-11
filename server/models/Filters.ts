import { gql } from "apollo-server-express"

export interface Filters {
  types: [String]
  countries: [String]
  tags: [String]
}

export const filtersTypeDef = gql`
  type Filters {
    types: [String]!
    countries: [String]!
    tags: [String]!
  }
`

export const filtersResolver = {}
