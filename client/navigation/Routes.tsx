import { CountriesSearchNavigationProps } from '~client/modules/filters/modals/CountriesSearch'
import { TagsSearchNavigationProps } from '~client/modules/filters/modals/TagsSearch'

export type Routes = {
  Root: undefined
  Main: undefined
  Filters: undefined
  CountriesSearch: CountriesSearchNavigationProps
  TagsSearch: TagsSearchNavigationProps
}
