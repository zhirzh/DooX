import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

const Space: FC<Props> = ({ width, height, color }) => (
  <View style={{ width, height, backgroundColor: color }} />
)

interface Props {
  width?: ViewStyle["width"]
  height?: ViewStyle["height"]
  color?: ViewStyle["backgroundColor"]
}

export default Space
