import { CountriesSearchRouteProps } from '~client/modules/filters/modals/CountriesSearch'
import { TagsSearchRouteProps } from '~client/modules/filters/modals/TagsSearch'

export type Routes = {
  Root: undefined
  Main: undefined
  Filters: undefined
  CountriesSearch: CountriesSearchRouteProps
  TagsSearch: TagsSearchRouteProps
}
