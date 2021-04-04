import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { QueryOrder } from '~types/graphql'
import { DoodleType } from '~types/NormalizedDoodle'
import { StoreState } from '.'

export interface Filters {
  searchText: string
  type: DoodleType | null
  countries: string[]
  tags: string[]
  startDate: string | null // YYYY-MM-DD
  endDate: string | null // YYYY-MM-DD
  order: QueryOrder
}

const initialState: Filters = {
  searchText: '',
  type: null,
  countries: [],
  tags: [],
  startDate: null,
  endDate: null,
  order: QueryOrder.Latest,
}

const { reducer, actions } = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchText: (state, { payload: searchText }: PayloadAction<string>) => {
      state.searchText = searchText
    },

    resetSearchText: state => {
      state.searchText = initialState.searchText
    },

    setDoodleType: (state, { payload: doodleType }: PayloadAction<DoodleType | null>) => {
      state.type = doodleType
    },

    setCountries: (state, { payload: countries }: PayloadAction<string[]>) => {
      state.countries = countries
    },

    removeCountry: (state, { payload: country }: PayloadAction<string>) => {
      if (state.countries.includes(country)) {
        const i = state.countries.indexOf(country)
        state.countries.splice(i, 1)
      }
    },

    setTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tags = tags
    },

    removeTag: (state, { payload: tag }: PayloadAction<string>) => {
      if (state.countries.includes(tag)) {
        const i = state.countries.indexOf(tag)
        state.countries.splice(i, 1)
      }
    },

    setStartDate: (state, { payload: date }: PayloadAction<string>) => {
      state.startDate = date
    },

    resetStartDate: state => {
      state.startDate = initialState.startDate
    },

    setEndDate: (state, { payload: date }: PayloadAction<string>) => {
      state.endDate = date
    },

    resetEndDate: state => {
      state.endDate = initialState.endDate
    },

    setOrder: (state, { payload: order }: PayloadAction<QueryOrder>) => {
      state.order = order
    },

    resetFilters: () => initialState,
  },
})

export { reducer as filters }

const filtersSelector = (state: StoreState) => state.filters

export const useFilters = () => useSelector(filtersSelector)

export const {
  setSearchText,
  resetSearchText,

  setDoodleType,

  setCountries,
  removeCountry,

  setTags,
  removeTag,

  setStartDate,
  resetStartDate,

  setEndDate,
  resetEndDate,

  setOrder,

  resetFilters,
} = actions
