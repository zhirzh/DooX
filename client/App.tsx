import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React, { FC } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import createApolloClient from './apolloClient'
import Root from './modules/main/screens/Root'
import createStore from './store'

const App: FC = () => (
  <>
    <StatusBar style="auto" />

    <Provider store={createStore()}>
      <ApolloProvider client={createApolloClient()}>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  </>
)

export default App
