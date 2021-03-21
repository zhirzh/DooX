import { Feather, MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { blue, white } from '~client/colors'
import Separator from '~client/components/Separator'
import { Routes } from '~client/navigation/Routes'

const Footer: FC<Props> = ({ animatedValue }) => {
  const [height, setHeight] = useState(0)

  const { bottom } = useSafeAreaInsets()

  const { navigate } = useNavigation<NavigationProp<Routes>>()

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
              navigate('Filters')
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
