import { useLayout } from '@react-native-community/hooks'
import React, { FC } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme } from '~/client/lib/theme'

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    elevation: 8,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  footerAction: {
    marginHorizontal: 8,
    flexGrow: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type FooterProps = {
  animatedValue: Animated.Value
}

const Footer: FC<FooterProps> = ({ animatedValue }) => {
  const { height, onLayout } = useLayout()
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1 * height],
  })

  const { bottom } = useSafeAreaInsets()
  const paddingBottom = bottom || 8

  const { colors } = useTheme() as Theme

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.footer,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          paddingBottom,
        },
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.footerAction}>
        <Text>Sort</Text>
      </View>

      <View style={styles.footerAction}>
        <Text>Filters</Text>
      </View>
    </Animated.View>
  )
}

export default Footer
