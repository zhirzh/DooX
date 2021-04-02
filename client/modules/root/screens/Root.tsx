import { Feather } from '@expo/vector-icons'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { black, white } from '~client/colors'
import Reel from '../partials/Reel'
import Search from '../partials/Search'

const Root: FC = () => {
  const [searchMode, setSearchMode] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: searchMode ? 1 : 0,
      duration: 180,
    }).start()
  }, [searchMode])

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <View style={styles.header}>
          <Text style={styles.brand}>Doox</Text>

          <TouchableOpacity
            style={styles.search}
            onPress={() => {
              setSearchMode(true)
            }}
          >
            <Feather name="search" size={20} color={black} />
          </TouchableOpacity>
        </View>

        <Reel />
      </SafeAreaView>

      <Search
        searchMode={searchMode}
        onClose={() => {
          setSearchMode(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 20,
  },
  search: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  footerWrapper: {
    marginTop: 'auto',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 4,
    paddingBottom: 8,
  },
  action: {
    flexGrow: 1,
    alignItems: 'center',
  },
})

export default Root
