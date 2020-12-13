import React, { FC, useState } from "react"
import { Image, StyleSheet, Text, useWindowDimensions } from "react-native"
import { faintGray } from "../colors"
import Separator from "./Separator"

const Card: FC<Props> = ({ title, imageUrl }) => {
  const [aspect, setAspect] = useState(2.5)
  const { width } = useWindowDimensions()
  const height = width / aspect

  const [loading, setLoading] = useState(true)

  return (
    <>
      <Separator />

      <Text style={styles.title}>{title}</Text>

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
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
  },
})

export default Card
