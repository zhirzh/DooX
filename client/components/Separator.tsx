import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'
import { faintGray } from '../colors'

const Separator: FC<Props> = ({ vertical, size = '100%', thickness = 1, color = faintGray }) => (
  <View
    style={{
      width: vertical ? thickness : size,
      height: vertical ? size : thickness,
      backgroundColor: color,
    }}
  />
)

interface Props {
  vertical?: boolean
  size?: ViewStyle['width']
  thickness?: number
  color?: ViewStyle['backgroundColor']
}

export default Separator
