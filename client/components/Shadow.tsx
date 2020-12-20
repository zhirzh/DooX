import React, { FC } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated from 'react-native-reanimated'
import { grayTransparent } from '../colors'

const Shadow: FC<Props> = ({ opacity = 1, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity,
          backgroundColor: grayTransparent,
        },
      ]}
    />
  </TouchableWithoutFeedback>
)

interface Props {
  opacity?: Animated.Node<number>
  onPress: () => any
}

export default Shadow
