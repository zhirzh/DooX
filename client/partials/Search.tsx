import { Feather } from '@expo/vector-icons'
import { identity, isEmpty } from 'lodash'
import React, { FC, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { black, white } from '~client/colors'
import SearchBar from '~client/components/SearchBar'
import Separator from '~client/components/Separator'

const maxResults = 20

const Search: FC<Props> = ({ placeholder, options, selected, onClose, onSelect }) => {
  const [rawQuery, setQuery] = useState('')

  const query = rawQuery.trim().toLowerCase()

  const queryPattern = new RegExp(`^${query}`, 'i')

  const results =
    query === ''
      ? selected
      : options.filter(option => queryPattern.test(option)).slice(0, maxResults)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <SearchBar
        placeholder={placeholder}
        action={isEmpty(results) ? 'Cancel' : 'Done'}
        value={rawQuery}
        onChange={setQuery}
        onClear={() => {
          setQuery('')
        }}
        onClose={() => {
          setQuery('')
          onClose?.()
        }}
      />

      <FlatList
        keyboardShouldPersistTaps="handled"
        data={results}
        keyExtractor={identity}
        renderItem={({ item: option }) => {
          const isSelected = selected.includes(option)

          return (
            <TouchableOpacity
              onPress={() => {
                onSelect(option)
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontWeight: isSelected && query !== '' ? 'bold' : 'normal',
                  }}
                >
                  {option}
                </Text>

                {isSelected && (
                  <Feather name={query === '' ? 'x' : 'check'} size={16} color={black} />
                )}
              </View>
            </TouchableOpacity>
          )
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </SafeAreaView>
  )
}

interface Props {
  placeholder: string
  options: string[]
  selected: string[]
  onClose?: () => any
  onSelect: (optionId: string) => any
}

export default Search
