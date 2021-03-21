import { StackScreenProps } from '@react-navigation/stack'
import { without } from 'lodash'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes } from '~client/navigation/Routes'
import Search from '~client/partials/Search'
import { setCountries, useFilters } from '~client/store/filters'

const CountriesSearch: FC<Props> = ({ navigation, route }) => {
  const { countries } = route.params

  const { goBack } = navigation

  const filters = useFilters()

  const dispatch = useDispatch()

  const [selectedCountries, setSelectedCountries] = useState(filters.countries)

  return (
    <Search
      placeholder="Search countries"
      selected={selectedCountries}
      options={countries}
      onClose={() => {
        goBack()
        dispatch(setCountries(selectedCountries))
      }}
      onSelect={country => {
        setSelectedCountries(
          selectedCountries.includes(country)
            ? without(selectedCountries, country)
            : selectedCountries.concat(country)
        )
      }}
    />
  )
}

export interface CountriesSearchNavigationProps {
  countries: string[]
}

interface Props extends StackScreenProps<Routes, 'CountriesSearch'> {}

export default CountriesSearch
