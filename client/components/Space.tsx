import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'

const Space: FC<Props> = ({ width, height }) => <View style={{ width, height }} />

interface Props {
  width?: ViewStyle['width']
  height?: ViewStyle['height']
}

export default Space
