import { MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { blue, white } from '~client/colors'
import SearchBar from '~client/components/SearchBar'
import Separator from '~client/components/Separator'
import Space from '~client/components/Space'
import { Routes } from '~client/navigation/Routes'
import { resetFilters, resetSearchText, setSearchText, useFilters } from '~client/store/filters'

const Root: FC<Props> = ({ searchMode, onClose }) => {
  const { searchText } = useFilters()

  const dispatch = useDispatch()

  const { navigate } = useNavigation<NavigationProp<Routes>>()

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: searchMode ? 1 : 0,
      duration: 180,
    }).start()
  }, [searchMode])

  const [searchHeight, setSearchHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)

  return (
    <SafeAreaView
      mode="margin"
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}
    >
      <Animated.View
        onLayout={({ nativeEvent }) => {
          setSearchHeight(nativeEvent.layout.height)
        }}
        style={[
          styles.search,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, searchHeight],
                }),
              },
            ],
          },
        ]}
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
            onClose()
          }}
        />
      </Animated.View>

      <Animated.View
        onLayout={({ nativeEvent }) => {
          setFooterHeight(nativeEvent.layout.height)
        }}
        style={[
          styles.footer,
          {
            backgroundColor: white,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -1 * footerHeight],
                }),
              },
            ],
          },
        ]}
      >
        <Separator />

        <TouchableOpacity
          style={styles.footerAction}
          onPress={() => {
            navigate('Filters')
          }}
        >
          <MaterialIcons name="tune" size={24} color={blue} />
          <Space width={4} />
          <Text style={{ color: blue, fontSize: 16 }}>Filter</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

interface Props {
  searchMode: boolean
  onClose: () => any
}

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    width: '100%',
    bottom: '100%',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    top: '100%',
  },
  footerAction: {
    flexGrow: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Root
