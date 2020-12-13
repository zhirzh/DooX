import { Feather } from "@expo/vector-icons"
import React, { FC } from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { black, blackHighlight } from "../colors"

const AppHeader: FC = () => (
  <View style={styles.header}>
    <Text style={styles.brand}>Dooex</Text>

    <TouchableHighlight
      underlayColor={blackHighlight}
      style={styles.search}
      onPress={() => alert()}
    >
      <Feather name="search" size={20} color={black} />
    </TouchableHighlight>
  </View>
)

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
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
})

export default AppHeader
