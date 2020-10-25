import { useBackHandler } from '@react-native-community/hooks'
import { RouteProp } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { lockAsync, OrientationLock } from 'expo-screen-orientation'
import React, { FC, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { GetRoutes } from '~/client/Routes'

const styles = StyleSheet.create({
  closeWrapper: {
    position: 'absolute',
  },
  close: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
  },
})

type RouteProps = {
  title: string
  url: string
}

declare module '~/client/Routes' {
  interface Routes {
    Iframe: RouteProps
  }
}

type Props = RouteProp<GetRoutes, 'Iframe'> & StackScreenProps<GetRoutes, 'Iframe'>

const Iframe: FC<Props> = ({ route, navigation }) => {
  const { url } = route.params

  const { top, right } = useSafeAreaInsets()

  const goBack = () => {
    navigation.goBack()
    lockAsync(OrientationLock.PORTRAIT_UP) // iOS doesn't support `OrientationLock.PORTRAIT`
  }

  useBackHandler(() => {
    if (!navigation.isFocused()) {
      return false
    }

    goBack()

    return true
  })

  useEffect(() => {
    lockAsync(OrientationLock.LANDSCAPE)
  }, [])

  return (
    <>
      <WebView source={{ uri: url }} />

      <View
        style={[
          styles.closeWrapper,
          {
            top: Math.max(top + 2, 24),
            right: Math.max(right + 2, 24),
          },
        ]}
      >
        <TouchableOpacity onPress={goBack}>
          <View style={styles.close} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Iframe
