import { Feather } from '@expo/vector-icons'
import React, { FC, useEffect, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { black } from '~client/colors'
import SearchBar from '~client/components/SearchBar'
import { resetFilters, resetSearchText, setSearchText, useFilters } from '~client/store/filters'

const Header: FC<Props> = ({ animatedValue, onSearchModeChange }) => {
  const [searchMode, setSearchMode] = useState(false)
  const [height, setHeight] = useState(0)

  const { searchText } = useFilters()

  const dispatch = useDispatch()

  const { top } = useSafeAreaInsets()

  useEffect(() => {
    onSearchModeChange(searchMode)
  }, [searchMode])

  return (
    <>
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

      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          top,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height)
          }}
          style={{
            paddingTop: 4,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height, 0],
                }),
              },
            ],
          }}
        >
          <SearchBar
            placeholder="Search doodles"
            action="Cancel"
            value={searchText}
            onChange={searchText => {
              dispatch(setSearchText(searchText))
            }}
            onClear={() => {
              dispatch(resetSearchText())
            }}
            onClose={() => {
              dispatch(resetFilters())
              setSearchMode(false)
            }}
          />
        </Animated.View>
      </View>
    </>
  )
}

interface Props {
  animatedValue: Animated.Value
  onSearchModeChange: (searchMode: boolean) => any
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
})

export default Header
