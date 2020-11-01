import { Easing } from 'react-native'

export const padding = {
  horizontal: 16,
  left: 16,
  right: 16,

  vertical: 8,
  top: 8,
  bottom: 8,
}

export const animationConfig = {
  easing: Easing.out(Easing.exp),
  duration: 360 * 1,
  useNativeDriver: true,
}
