import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import type { Doodle } from '~/client/screens/Home/query'
import DoodleCardImage from './DoodleCardImage'

const styles = StyleSheet.create({
  card: {
    elevation: 0,
  },
})

type Props = {
  doodle: Doodle
}

const DoodleCard: FC<Props> = ({ doodle }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={doodle.title} />
      <DoodleCardImage doodle={doodle} />
    </Card>
  )
}

export default DoodleCard
