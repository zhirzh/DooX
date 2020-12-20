import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns/esm'
import React, { FC, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { blue, darkGray, white } from '~client/colors'
import Space from '~client/components/Space'
import Modal from '~client/modals/Modal'

const DatePicker: FC<Props> = ({ label, value, minDate, maxDate, onSelect }) => {
  const [visible, setVisible] = useState(false)

  const renderDatePicker = () => (
    <DateTimePicker
      mode="date"
      value={value}
      minimumDate={minDate}
      maximumDate={maxDate}
      display={Platform.select({ ios: 'spinner' })}
      style={{ backgroundColor: white }}
      onChange={(_, date) => {
        setVisible(false)
        onSelect(date)
      }}
    />
  )

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setVisible(true)
        }}
      >
        <View style={styles.date}>
          <Text style={[styles.label, { color: darkGray }]}>{label}</Text>
          <Space width={8} />
          <Text style={{ color: blue, fontSize: 16 }}>{format(value, 'MMM do, yyyy')}</Text>
        </View>
      </TouchableOpacity>

      {Platform.OS !== 'ios' && visible && renderDatePicker()}

      {Platform.OS === 'ios' && (
        <Modal
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
        >
          {renderDatePicker()}
        </Modal>
      )}
    </View>
  )
}

interface Props {
  label: string
  value: Date
  minDate?: Date
  maxDate?: Date
  onSelect: (date?: Date) => any
}

const styles = StyleSheet.create({
  date: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 12,
  },
})

export default DatePicker
