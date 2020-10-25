import { ApolloProvider } from '@apollo/client'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { merge } from 'lodash-es'
import React, { FC } from 'react'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import createApolloClient from '~/client/apolloClient'
import { GetRoutes } from '~/client/Routes'
import Home from '~/client/screens/Home'
import Iframe from '~/client/screens/Iframe'

const rootStack = createStackNavigator<GetRoutes>()
const RootStack: FC = () => (
  <rootStack.Navigator>
    <rootStack.Screen name="Home" component={Home} />
  </rootStack.Navigator>
)

const appStack = createStackNavigator()
const AppStack: FC = () => (
  <appStack.Navigator mode="modal" headerMode="none">
    <appStack.Screen name="Root" component={RootStack} />
    <appStack.Screen name="Iframe" component={Iframe} />
  </appStack.Navigator>
)

const DefaultTheme = merge({}, PaperDefaultTheme, NavigationDefaultTheme)
const DarkTheme = merge({}, PaperDarkTheme, NavigationDarkTheme)

const App: FC = () => (
  <PaperProvider theme={DefaultTheme}>
    <NavigationContainer theme={DefaultTheme}>
      <ApolloProvider client={createApolloClient()}>
        <AppStack />
      </ApolloProvider>
    </NavigationContainer>
  </PaperProvider>
)

export default App
