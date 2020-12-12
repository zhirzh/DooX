import { ApolloProvider } from "@apollo/client"
import { StatusBar } from "expo-status-bar"
import React, { FC } from "react"
import { SafeAreaView } from "react-native"
import createApolloClient from "./apolloClient"
import { white } from "./colors"
import AppHeader from "./components/AppHeader"
import Reel from "./components/Reel"

const Root: FC = () => (
  <>
    <StatusBar style="auto" translucent={false} backgroundColor={white} />

    <ApolloProvider client={createApolloClient()}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader />
        <Reel />
      </SafeAreaView>
    </ApolloProvider>
  </>
)

export default Root
