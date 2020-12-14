import React, { FC, useState } from "react"
import { Image, StyleSheet, Text, useWindowDimensions } from "react-native"
import { faintGray } from "../colors"

const Card: FC<Props> = ({ title, imageUrl }) => {
  const [aspect, setAspect] = useState(2.5)
  const { width } = useWindowDimensions()
  const height = width / aspect

  const [loading, setLoading] = useState(true)

  return (
    <>
      <Text style={styles.title}>{title}</Text>

      <Image
        style={{ backgroundColor: loading ? faintGray : undefined }}
        source={{ uri: imageUrl, width, height }}
        onLoad={e => {
          setLoading(false)

          const { width, height } = e.nativeEvent.source
          setAspect(width / height)
        }}
      />
    </>
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
