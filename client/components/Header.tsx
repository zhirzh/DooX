import { Feather } from "@expo/vector-icons"
import React, { FC, useEffect, useState } from "react"
import { Animated, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { black, blackHighlight } from "../colors"
import SearchBar from "./SearchBar"

const Header: FC<Props> = ({ animatedValue, searchText, onSearchModeChange, setSearchText }) => {
  const [searchMode, setSearchMode] = useState(false)
  const [height, setHeight] = useState(0)

  const { top } = useSafeAreaInsets()

  useEffect(() => {
    onSearchModeChange(searchMode)
  }, [searchMode])

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.brand}>Dooex</Text>

        <TouchableHighlight
          underlayColor={blackHighlight}
          style={styles.search}
          onPress={() => {
            setSearchMode(true)
          }}
        >
          <Feather name="search" size={20} color={black} />
        </TouchableHighlight>
      </View>

      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top,
          width: "100%",
          overflow: "hidden",
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
            value={searchText}
            onChange={setSearchText}
            onClear={() => {
              setSearchText("")
            }}
            onClose={() => {
              setSearchText("")
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
  searchText: string
  onSearchModeChange: (searchMode: boolean) => any
  setSearchText: (searchText: string) => any
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
