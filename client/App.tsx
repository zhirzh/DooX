import { ApolloProvider } from "@apollo/client"
import { StatusBar } from "expo-status-bar"
import React, { FC } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import createApolloClient from "./apolloClient"
import Root from "./Root"

const App: FC = () => (
  <>
    <StatusBar style="auto" />

    <ApolloProvider client={createApolloClient()}>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </ApolloProvider>
  </>
)

export default App
