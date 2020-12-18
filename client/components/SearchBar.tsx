import { Feather } from "@expo/vector-icons"
import React, { createRef, FC } from "react"
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { black, blue, faintGray, white } from "../colors"
import Space from "./Space"

const SearchBar: FC<Props> = ({ value, onChange, onClear, onClose }) => {
  const input = createRef<TextInput>()

  return (
    <View style={[styles.searchBar, { backgroundColor: white }]}>
      <View style={[styles.inputWrapper, { backgroundColor: faintGray }]}>
        <TextInput
          ref={input}
          placeholder="Search"
          returnKeyType="search"
          value={value}
          style={styles.input}
          onChangeText={onChange}
        />

        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onClear()
            }}
          >
            <Feather name="x" size={16} color={black} />
          </TouchableOpacity>
        )}
      </View>

      <Space width={8} />

      <TouchableOpacity
        style={styles.cancelWrapper}
        onPress={() => {
          input.current?.blur()
          onClose()
        }}
      >
        <Text style={{ color: blue }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

interface Props {
  value: string
  onChange: (value: string) => any
  onClear: () => any
  onClose: () => any
}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputWrapper: {
    paddingStart: 12,
    paddingEnd: 8,
    paddingVertical: 2 + Platform.select({ ios: 4, default: 0 }),
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
  },
  cancelWrapper: {
    padding: 4,
  },
})

export default SearchBar
