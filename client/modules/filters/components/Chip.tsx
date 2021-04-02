import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { blue, darkGray, lightGray, white } from '~client/colors'

const Chip: FC<Props> = ({ label, selected, closeable, action, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.chip,
          { borderColor: action ? blue : lightGray },
          selected && {
            backgroundColor: blue,
            borderColor: 'transparent',
          },
          action && {
            borderStyle: 'dashed',
          },
        ]}
      >
        {action && <Feather name="plus" color={blue} size={12} style={styles.plus} />}

        <Text
          style={[
            styles.label,
            {
              color: selected ? white : action ? blue : darkGray,
              paddingStart: action ? 0 : 12,
              paddingEnd: closeable ? 0 : 12,
            },
          ]}
        >
          {label}
        </Text>

        {closeable && <Feather name="x" color={darkGray} size={12} style={styles.close} />}
      </View>
    </TouchableOpacity>
  )
}

interface Props {
  label: string
  selected?: boolean
  closeable?: boolean
  action?: boolean
  onPress: () => any
}

const styles = StyleSheet.create({
  chip: {
    marginEnd: 8,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingVertical: 4,
    fontSize: 12,
    textAlign: 'center',
  },
  close: {
    marginTop: 2,
    paddingStart: 4,
    paddingEnd: 8,
  },
  plus: {
    paddingStart: 8,
    paddingEnd: 4,
  },
})

export default Chip
