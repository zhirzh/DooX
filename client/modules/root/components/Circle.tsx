import React, { FC, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { faintGray } from '../../../colors'

const size = 64
const captionSpace = 24

const Circle: FC<Props> = ({ caption, imageUrl }) => {
  const [loading, setLoading] = useState(true)

  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, { borderColor: faintGray }]}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { backgroundColor: loading ? faintGray : undefined }]}
          onLoad={() => {
            setLoading(false)
          }}
        />
      </View>

      <Text style={styles.caption} numberOfLines={1}>
        {caption}
      </Text>
    </View>
  )
}

interface Props {
  caption: string
  imageUrl: string
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: size + captionSpace,
  },
  circle: {
    width: size,
    aspectRatio: 1,
    borderRadius: size,
    overflow: 'hidden',
    borderWidth: 1,
  },
  caption: {
    padding: 8,
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default Circle
