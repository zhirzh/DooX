import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as search } from './search'

export type DispatchProps<D extends { [K: string]: (...args: any) => any }> = {
  [K in keyof D]: (...args: Parameters<D[K]>) => void
}

const rootReducer = combineReducers({
  search,
})

export type StoreState = ReturnType<typeof rootReducer>

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export default createStore
