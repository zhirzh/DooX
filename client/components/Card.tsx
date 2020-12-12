import React, { FC, useState } from "react"
import { Image, StyleSheet, Text, useWindowDimensions } from "react-native"
import { faintGray } from "../colors"
import Space from "./Space"

const Card: FC<Props> = ({ title, imageUrl }) => {
  const [aspect, setAspect] = useState(2.5)
  const { width } = useWindowDimensions()
  const height = width / aspect

  const [loading, setLoading] = useState(true)

  return (
    <>
      <Text style={styles.title}>{title}</Text>

      <Space width="100%" color={faintGray} height={1} />

      <Image
        style={{ backgroundColor: loading ? faintGray : undefined }}
        source={{ uri: imageUrl, width, height }}
        onLoad={({ nativeEvent }) => {
          setLoading(false)

          const { width, height } = nativeEvent.source
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
    padding: 8,
    fontSize: 16,
  },
})

export default Card
