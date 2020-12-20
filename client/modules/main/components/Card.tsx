import React, { FC, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { faintGray } from '~/client/colors'

const Card: FC<Props> = ({ title, imageUrl }) => {
  const [aspectRatio, setAspectRatio] = useState(2.5)
  const [width, setWidth] = useState(0)

  const [loading, setLoading] = useState(true)

  return (
    <View
      onLayout={({ nativeEvent }) => {
        setWidth(nativeEvent.layout.width)
      }}
    >
      <Text style={styles.title}>{title}</Text>

      <Image
        style={{ width, aspectRatio }}
        source={{ uri: imageUrl }}
        onLoad={({ nativeEvent }) => {
          setLoading(false)

          const { width, height } = nativeEvent.source
          setAspectRatio(width / height)
        }}
      />

      {loading && (
        <View
          style={{
            width,
            aspectRatio: aspectRatio,
            backgroundColor: faintGray,
            opacity: 0.5,
            position: 'absolute',
            bottom: 0,
          }}
        />
      )}
    </View>
  )
}

interface Props {
  title: string
  imageUrl: string
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
  },
})

export default Card
