import { ApolloProvider } from '@apollo/client'
import { useReduxDevToolsExtension } from '@react-navigation/devtools'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { createRef, FC } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import createApolloClient from './apolloClient'
import Rootstack from './navigation'
import createStore from './store'

const App: FC = () => {
  const navigationRef = createRef<NavigationContainerRef>()

  if (__DEV__) {
    useReduxDevToolsExtension(navigationRef)
  }

  return (
    <>
      <StatusBar style="auto" />

      <Provider store={createStore()}>
        <ApolloProvider client={createApolloClient()}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <Rootstack />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApolloProvider>
      </Provider>
    </>
  )
}

export default App
