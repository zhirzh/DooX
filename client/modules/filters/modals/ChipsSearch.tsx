import { without } from 'lodash'
import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native'
import Search from '~client/modals/Search'
import Chip from '../components/Chip'
import styles from '../styles'

const ChipsSearch: FC<Props> = ({ placeholder, options, initialSelectedOptions = [], onClose }) => {
  const [searchVisible, setSearchVisible] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions)

  return (
    <>
      <ScrollView
        horizontal
        style={{ flexGrow: 0 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <Chip
          label="Add"
          action
          onPress={() => {
            setSearchVisible(true)
          }}
        />

        {selectedOptions.map(option => (
          <Chip
            closeable
            key={option}
            label={option}
            onPress={() => {
              setSelectedOptions(without(selectedOptions, option))
            }}
          />
        ))}
      </ScrollView>

      <Search
        placeholder={placeholder}
        selected={selectedOptions}
        visible={searchVisible}
        options={options}
        onClose={() => {
          setSearchVisible(false)

          onClose?.(selectedOptions)
        }}
        onSelect={option => {
          setSelectedOptions(
            selectedOptions.includes(option)
              ? without(selectedOptions, option)
              : selectedOptions.concat(option)
          )
        }}
      />
    </>
  )
}

interface Props {
  placeholder: string
  options: string[]
  initialSelectedOptions?: string[]
  onClose?: (selectedOptions: string[]) => any
}

export default ChipsSearch
