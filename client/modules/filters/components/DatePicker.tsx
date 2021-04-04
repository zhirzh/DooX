import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns/esm'
import React, { FC, useState } from 'react'
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { black, blue, darkGray, shadowOpacity, white } from '~client/colors'
import Space from '~client/components/Space'

const DatePicker: FC<Props> = ({ label, value, minDate, maxDate, onSelect }) => {
  const [visible, setVisible] = useState(false)

  const onChange = (date?: Date) => {
    setVisible(false)
    onSelect(date)
  }

  return (
    <>
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

      {Platform.OS !== 'ios' && visible && (
        <DateTimePicker
          mode="date"
          value={value}
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={(_, date) => {
            onChange(date)
          }}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal transparent animationType="fade" visible={visible}>
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, { backgroundColor: black, opacity: shadowOpacity }]}
            onPress={() => {
              setVisible(false)
            }}
          />

          <View style={[styles.ios, { backgroundColor: white }]}>
            <DateTimePicker
              mode="date"
              display="inline"
              value={value}
              minimumDate={minDate}
              maximumDate={maxDate}
              onChange={(_, date) => {
                onChange(date)
              }}
            />
          </View>
        </Modal>
      )}
    </>
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
  ios: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: 20,
    padding: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
})

export default DatePicker
