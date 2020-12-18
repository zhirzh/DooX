import React, { FC, useRef, useState } from "react"
import { Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Reel from "./components/Reel"

const Root: FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current

  const setAnimatedValue = (searchMode: boolean) => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: searchMode ? 1 : 0,
      duration: 180,
    }).start()
  }

  const [searchText, setSearchText] = useState("")

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        animatedValue={animatedValue}
        searchText={searchText}
        onSearchModeChange={setAnimatedValue}
        setSearchText={setSearchText}
      />

      <Reel searchText={searchText} />

      <Footer animatedValue={animatedValue} />
    </SafeAreaView>
  )
}

export default Root
