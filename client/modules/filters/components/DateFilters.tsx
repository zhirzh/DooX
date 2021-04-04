import { isEqual, startOfToday } from 'date-fns'
import React, { FC } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  resetEndDate,
  resetStartDate,
  setEndDate,
  setStartDate,
  useFilters,
} from '~client/store/filters'
import { firstDoodleDate } from '~shared/constants'
import { parseDateString, stringifyDate } from '~shared/utils/date'
import DatePicker from './DatePicker'

const DateFilters: FC = () => {
  const filters = useFilters()

  const dispatch = useDispatch()

  const minDate = firstDoodleDate
  const maxDate = startOfToday()

  const startDate = filters.startDate ? parseDateString(filters.startDate) : minDate
  const endDate = filters.endDate ? parseDateString(filters.endDate) : maxDate

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexGrow: 1 }}>
        <DatePicker
          label="FROM"
          value={startDate}
          minDate={minDate}
          maxDate={endDate}
          onSelect={date => {
            if (date) {
              const action = isEqual(minDate, date)
                ? resetStartDate()
                : setStartDate(stringifyDate(date))

              dispatch(action)
            }
          }}
        />
      </View>

      <View style={{ flexGrow: 1 }}>
        <DatePicker
          label="TO"
          value={endDate}
          minDate={startDate}
          maxDate={maxDate}
          onSelect={date => {
            if (date) {
              const action = isEqual(maxDate, date)
                ? resetEndDate()
                : setEndDate(stringifyDate(date))

              dispatch(action)
            }
          }}
        />
      </View>
    </View>
  )
}

export default DateFilters
