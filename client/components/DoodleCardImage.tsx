import { useImageDimensions } from '@react-native-community/hooks'
import { useNavigation } from '@react-navigation/native'
import React, { FC, useRef } from 'react'
import { Image, Linking, TouchableWithoutFeedback } from 'react-native'
import type { Doodle } from '~/client/screens/Home/query'

type Props = {
  doodle: Doodle
}

const DoodleCardImage: FC<Props> = ({ doodle }) => {
  const { navigate } = useNavigation()

  const url =
    doodle.type === 'simple'
      ? doodle.high_res_url
      : doodle.call_to_action_image_url || doodle.high_res_url

  const source = useRef({ uri: url }).current

  const imageSize = useImageDimensions(source).dimensions

  if (!imageSize) {
    return null
  }

  const { width, height, aspectRatio } = imageSize

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (doodle.type === 'simple') {
          return
        }

        if (doodle.type === 'video') {
          Linking.openURL(`https://youtu.be/${doodle.youtube_id}`)
          return
        }

        navigate('Iframe', {
          title: doodle.title,
          url: doodle.standalone_html,
        })
      }}
    >
      <Image source={source} width={width} height={height} style={{ aspectRatio }} />
    </TouchableWithoutFeedback>
  )
}

export default DoodleCardImage
