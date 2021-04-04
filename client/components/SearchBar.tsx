import { MaterialIcons } from '@expo/vector-icons'
import React, { createRef, FC } from 'react'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { black, blue, faintGray, white } from '~/client/colors'
import Space from './Space'

const SearchBar: FC<Props> = ({ placeholder, action, value, onChange, onClear, onClose }) => {
  const input = createRef<TextInput>()

  return (
    <View style={[styles.searchBar, { backgroundColor: white }]}>
      <View style={[styles.inputWrapper, { backgroundColor: faintGray }]}>
        <TextInput
          ref={input}
          placeholder={placeholder}
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
            <MaterialIcons name="close" size={16} color={black} style={styles.actionWrapper} />
          </TouchableOpacity>
        )}
      </View>

      <Space width={8} />

      <TouchableOpacity
        style={styles.actionWrapper}
        onPress={() => {
          input.current?.blur()
          onClose()
        }}
      >
        <Text style={{ color: blue }}>{action}</Text>
      </TouchableOpacity>
    </View>
  )
}

interface Props {
  placeholder: string
  action: string
  value: string
  onChange: (value: string) => any
  onClear: () => any
  onClose: () => any
}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    paddingStart: 12,
    paddingEnd: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  input: {
    paddingVertical: 4 + Platform.select({ ios: 4, default: 0 }),
    flexGrow: 1,
    fontSize: 16,
  },
  actionWrapper: {
    padding: 4,
  },
})

export default SearchBar
