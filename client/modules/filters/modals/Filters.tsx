import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { blue, gray, white } from '~client/colors'
import Modal from '~client/modals/Modal'
import { StoreState } from '~client/store'
import { resetFilters, setCountries, setDoodleType, setTags } from '~client/store/filters'
import { useFiltersQuery } from '~types/graphql'
import Chip from '../components/Chip'
import DateFilters from '../components/DateFilters'
import styles from '../styles'
import ChipsSearch from './ChipsSearch'

const Filters: FC<Props> = ({ visible, onClose }) => {
  const filters = useSelector((state: StoreState) => state.filters)

  const dispatch = useDispatch()

  const { data } = useFiltersQuery()

  return (
    <>
      <Modal onClose={onClose} visible={visible}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color={gray} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch(resetFilters())
              }}
            >
              <Text style={[styles.clear, { color: blue }]}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: white }]}>
          <Text style={[styles.section, { paddingTop: 0 }]}>Type</Text>

          <ScrollView
            horizontal
            style={{ flexGrow: 0 }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
          >
            {data?.filters.types.map(type => (
              <Chip
                key={type}
                label={type}
                selected={type === filters.doodleType}
                onPress={() => {
                  dispatch(setDoodleType(type === filters.doodleType ? null : type))
                }}
              />
            ))}
          </ScrollView>

          <Text style={styles.section}>Countries</Text>

          <ChipsSearch
            placeholder="Search countries"
            options={data?.filters.countries || []}
            initialSelectedOptions={filters.countries}
            onClose={countries => {
              dispatch(setCountries(countries))
            }}
          />

          <Text style={styles.section}>Tags</Text>

          <ChipsSearch
            placeholder="Search tags"
            options={data?.filters.tags || []}
            initialSelectedOptions={filters.tags}
            onClose={tags => {
              dispatch(setTags(tags))
            }}
          />

          <Text style={styles.section}>Date</Text>

          <DateFilters />
        </View>
      </Modal>
    </>
  )
}

interface Props {
  visible: boolean
  onClose: () => any
}

export default Filters
