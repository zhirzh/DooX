import React, { FC, useRef } from 'react'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { white } from '~client/colors'
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Reel from '../partials/Reel'

const Root: FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current

  const setAnimatedValue = (searchMode: boolean) => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: searchMode ? 1 : 0,
      duration: 180,
    }).start()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <Header animatedValue={animatedValue} onSearchModeChange={setAnimatedValue} />

      <Reel />

      <Footer animatedValue={animatedValue} />
    </SafeAreaView>
  )
}

export default Root
