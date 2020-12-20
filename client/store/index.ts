import { configureStore } from '@reduxjs/toolkit'
import { filters } from '~client/store/filters'

const createStore = () =>
  configureStore({
    devTools: __DEV__,
    reducer: {
      filters,
    },
  })

export type StoreState = ReturnType<ReturnType<typeof createStore>['getState']>

export default createStore
