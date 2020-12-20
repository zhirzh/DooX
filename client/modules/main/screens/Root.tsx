import React, { FC, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Filters from '~client/modules/filters/modals/Filters'
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

  const [filtersVisibile, setFiltersVisibile] = useState(false)

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header animatedValue={animatedValue} onSearchModeChange={setAnimatedValue} />

        <Reel />

        <Footer
          animatedValue={animatedValue}
          openFilters={() => {
            setFiltersVisibile(true)
          }}
        />
      </SafeAreaView>

      <Filters
        visible={filtersVisibile}
        onClose={() => {
          setFiltersVisibile(false)
        }}
      />
    </>
  )
}

export default Root
