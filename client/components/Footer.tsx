import { Feather, MaterialIcons } from "@expo/vector-icons"
import React, { FC, useState } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { blue, white } from "../colors"
import Separator from "./Separator"

const Footer: FC<Props> = ({ animatedValue }) => {
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
            <Feather name="filter" size={24} color={blue} />
            <Text style={{ color: blue, fontSize: 12 }}>Sort</Text>
          </TouchableOpacity>

          <Separator vertical />

          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              alert()
            }}
          >
            <MaterialIcons name="sort" size={24} color={blue} />
            <Text style={{ color: blue, fontSize: 12 }}>Filter</Text>
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
    position: "absolute",
    width: "100%",
    overflow: "hidden",
  },
  footer: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 4,
  },
  action: {
    flexGrow: 1,
    alignItems: "center",
  },
})

export default Footer
