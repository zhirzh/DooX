import { startOfToday } from 'date-fns'
import React, { FC } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useHistoryDoodlesQuery } from '~types/graphql'
import Circle from '../components/Circle'

const HistoryReel: FC = () => {
  const today = startOfToday()

  const { data } = useHistoryDoodlesQuery({
    variables: {
      month: today.getMonth(),
      day: today.getDate(),
    },
  })

  return (
    <FlatList
      horizontal
      data={data?.historyDoodles}
      keyExtractor={doodle => doodle.id}
      renderItem={({ item: doodle }) => <Circle caption={doodle.title} imageUrl={doodle.url} />}
      contentContainerStyle={styles.reel}
    />
  )
}

const styles = StyleSheet.create({
  reel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
})

export default HistoryReel
