import { Feather } from "@expo/vector-icons"
import React, { FC, useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { black, blackHighlight, white } from "../colors"
import SearchBar from "./SearchBar"

const Header: FC<Props> = ({ animatedValue, searchText, setAnimatedValue, setSearchText }) => {
  const [searchMode, setSearchMode] = useState(false)

  useEffect(() => {
    setAnimatedValue(searchMode)
  }, [searchMode])

  const height = useRef(0)

  return (
    <View style={styles.wrapper}>
      <View
        style={styles.header}
        onLayout={e => {
          height.current = e.nativeEvent.layout.height
        }}
      >
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

      <Animated.View
        style={[
          styles.searchBarWrapper,
          {
            backgroundColor: white,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height.current],
                }),
              },
            ],
          },
        ]}
      >
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onClose={() => {
            setSearchMode(false)
          }}
        />
      </Animated.View>
    </View>
  )
}

interface Props {
  animatedValue: Animated.Value
  searchText: string
  setAnimatedValue: (searchMode: boolean) => any
  setSearchText: (searchText: string) => any
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
  },
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
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  searchBarWrapper: {
    position: "absolute",
    width: "100%",
    bottom: "100%",
  },
})

export default Header
