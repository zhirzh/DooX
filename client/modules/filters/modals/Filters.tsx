import { Feather } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import React, { FC } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { blue, gray, white } from '~client/colors'
import { Routes } from '~client/navigation/Routes'
import {
  removeCountry,
  removeTag,
  resetFilters,
  setDoodleType,
  useFilters,
} from '~client/store/filters'
import { useFiltersQuery } from '~types/graphql'
import Chip from '../components/Chip'
import DateFilters from '../components/DateFilters'

const Filters: FC<Props> = ({ navigation }) => {
  const { navigate, goBack } = navigation

  const filters = useFilters()

  const dispatch = useDispatch()

  const { data } = useFiltersQuery()

  return (
    <>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={goBack} />

      <View style={[styles.wrapper, { backgroundColor: white }]}>
        <View>
          <Text style={styles.title}>Filters</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={goBack}>
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

        <Text style={styles.section}>Type</Text>

        <ScrollView
          horizontal
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <Chip
            label="Add"
            action
            onPress={() => {
              navigate('CountriesSearch', {
                countries: data?.filters.countries || [],
              })
            }}
          />

          {filters.countries.map(country => (
            <Chip
              closeable
              key={country}
              label={country}
              onPress={() => {
                dispatch(removeCountry(country))
              }}
            />
          ))}
        </ScrollView>

        <Text style={styles.section}>Tags</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <Chip
            label="Add"
            action
            onPress={() => {
              navigate('TagsSearch', {
                tags: data?.filters.tags.slice(0, 10) || [],
              })
            }}
          />

          {filters.tags.map(tag => (
            <Chip
              closeable
              key={tag}
              label={tag}
              onPress={() => {
                dispatch(removeTag(tag))
              }}
            />
          ))}
        </ScrollView>

        <Text style={styles.section}>Date</Text>

        <DateFilters />
      </View>
    </>
  )
}

interface Props extends StackScreenProps<Routes, 'Filters'> {}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 'auto',
    paddingBottom: 40,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  title: {
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actions: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clear: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  section: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingStart: 16,
    fontSize: 12,
    fontWeight: 'bold',
  },
  chips: {
    paddingStart: 16,
    paddingEnd: 8,
  },
})

export default Filters
