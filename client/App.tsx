import { ApolloProvider } from "@apollo/client"
import { StatusBar } from "expo-status-bar"
import React, { FC } from "react"
import { SafeAreaView } from "react-native"
import createApolloClient from "./apolloClient"
import { white } from "./colors"
import Root from "./Root"

const App: FC = () => (
  <>
    <StatusBar style="auto" translucent={false} backgroundColor={white} />

    <ApolloProvider client={createApolloClient()}>
      <SafeAreaView style={{ flex: 1 }}>
        <Root />
      </SafeAreaView>
    </ApolloProvider>
  </>
)

export default App
