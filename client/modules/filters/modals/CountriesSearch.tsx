import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { without } from 'lodash'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes } from '~client/navigation/Routes'
import Search from '~client/partials/Search'
import { setCountries, useFilters } from '~client/store/filters'

const CountriesSearch: FC = () => {
  const { countries } = useRoute<RouteProp<Routes, 'CountriesSearch'>>().params

  const { goBack } = useNavigation()

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

export interface CountriesSearchRouteProps {
  countries: string[]
}

export default CountriesSearch
