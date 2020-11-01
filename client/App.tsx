import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import { useColorScheme } from 'react-native-appearance'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import createApolloClient from '~/client/lib/apolloClient'
import { DarkTheme, DefaultTheme } from '~/client/lib/theme'
import { GetRoutes } from '~/client/Routes'
import Home from '~/client/screens/Home'
import Iframe from '~/client/screens/Iframe'
import createStore from '~/client/store'

const rootStack = createStackNavigator<GetRoutes>()
const RootStack: FC = () => (
  <rootStack.Navigator>
    <rootStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
  </rootStack.Navigator>
)

const appStack = createStackNavigator<{
  Root: undefined
  Iframe: GetRoutes['Iframe']
}>()
const AppStack: FC = () => (
  <appStack.Navigator mode="modal" headerMode="none">
    <appStack.Screen name="Root" component={RootStack} />
    <appStack.Screen name="Iframe" component={Iframe} />
  </appStack.Navigator>
)

const App: FC = () => {
  const theme = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme
  return (
    <ReduxProvider store={createStore()}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <ApolloProvider client={createApolloClient()}>
            <AppStack />
          </ApolloProvider>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  )
}

export default App
