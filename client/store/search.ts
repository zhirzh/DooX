import { createSlice } from '@reduxjs/toolkit'
import { DoodleType } from '~/data/doodles'
import { QuerySortOrder } from '~/server/types'

type State = {
  searchText: string
  doodleType: DoodleType | 'all'
  countries: string[]
  tags: string[]
  sortOrder: QuerySortOrder
}

const initialState: State = {
  searchText: '',
  doodleType: 'all',
  countries: [],
  tags: [],
  sortOrder: QuerySortOrder.latest,
}

const { actions, reducer } = createSlice({
  name: 'search',
  initialState,
  reducers: {
    set: (state, { payload }: { payload: Partial<State> }) => ({ ...state, ...payload }),

    reset: (state, { payload }: { payload: undefined | keyof State | Array<keyof State> }) => {
      if (!payload) {
        return initialState
      }

      if (Array.isArray(payload)) {
        const nextState: State = { ...state }

        payload.forEach(k => {
          // @ts-ignore
          nextState[k] = initialState[k]
        })

        return nextState
      }

      return { ...state, [payload]: initialState[payload] }
    },
  },
})

export const { set: setSearch, reset: resetSearch } = actions

export { reducer }
