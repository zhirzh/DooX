import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DoodleType } from '~types/NormalizedDoodle'

export interface Filters {
  searchText: string
  doodleType: DoodleType | null
  countries: string[]
  tags: string[]
  startDate: string | null // YYYY-MM-DD
  endDate: string | null // YYYY-MM-DD
}

const initialState: Filters = {
  searchText: '',
  doodleType: null,
  countries: [],
  tags: [],
  startDate: null,
  endDate: null,
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
      state.doodleType = doodleType
    },

    setCountries: (state, { payload: countries }: PayloadAction<string[]>) => {
      state.countries = countries
    },

    setTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tags = tags
    },

    setStartDate: (state, { payload: date }: PayloadAction<string>) => {
      state.startDate = date
    },

    setEndDate: (state, { payload: date }: PayloadAction<string>) => {
      state.endDate = date
    },

    resetFilters: () => initialState,
  },
})

export { reducer as filters }

export const {
  setSearchText,
  resetSearchText,

  setDoodleType,

  setCountries,

  setTags,

  setStartDate,
  setEndDate,

  resetFilters,
} = actions
