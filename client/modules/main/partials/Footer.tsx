import { Feather, MaterialIcons } from '@expo/vector-icons'
import React, { FC, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { blue, white } from '~client/colors'
import Separator from '~client/components/Separator'

const Footer: FC<Props> = ({ animatedValue, openFilters }) => {
  const [height, setHeight] = useState(0)

  const { bottom } = useSafeAreaInsets()

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom }]}>
      <Animated.View
        onLayout={e => {
          setHeight(e.nativeEvent.layout.height)
        }}
        style={{
          backgroundColor: white,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        }}
      >
        <Separator />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              alert()
            }}
          >
            <MaterialIcons name="sort" size={24} color={blue} />
            <Text style={{ color: blue, fontSize: 14 }}>Sort</Text>
          </TouchableOpacity>

          <Separator vertical />

          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              openFilters()
            }}
          >
            <Feather name="filter" size={20} color={blue} />
            <Text style={{ color: blue, fontSize: 14 }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

interface Props {
  animatedValue: Animated.Value
  openFilters: () => any
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 4,
    paddingBottom: 8,
  },
  action: {
    flexGrow: 1,
    alignItems: 'center',
  },
})

export default Footer
