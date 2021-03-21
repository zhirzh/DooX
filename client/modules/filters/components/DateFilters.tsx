import { max, min, startOfToday } from 'date-fns'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setEndDate, setStartDate, useFilters } from '~client/store/filters'
import { firstDoodleDate } from '~shared/constants'
import { parseDateString, stringifyDate } from '~shared/utils/date'
import DatePicker from './DatePicker'

const DateFilters: FC<Props> = ({}) => {
  const filters = useFilters()

  const dispatch = useDispatch()

  const minDate = firstDoodleDate
  const maxDate = startOfToday()

  const startDate = filters.startDate ? parseDateString(filters.startDate) : minDate
  const endDate = filters.endDate ? parseDateString(filters.endDate) : maxDate

  useEffect(() => {
    if (minDate) {
      dispatch(setStartDate(stringifyDate(minDate)))
    }
  }, [minDate])

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
              dispatch(setStartDate(stringifyDate(clampDate(date, [minDate, maxDate]))))
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
              dispatch(setEndDate(stringifyDate(clampDate(date, [minDate, maxDate]))))
            }
          }}
        />
      </View>
    </View>
  )
}

interface Props {}

const clampDate = (date: Date, [lo, hi]: [Date, Date]) => max([lo, min([date, hi])])

export default DateFilters
