import { gql, useQuery } from "@apollo/client"
import { startOfToday } from "date-fns"
import React, { FC } from "react"
import { FlatList, StyleSheet } from "react-native"
import { HistoryDoodlesQuery, QueryHistoryDoodlesArgs } from "~/types/graphql"
import Circle from "./Circle"

const HistoryReel: FC = () => {
  const today = startOfToday()

  const { data } = useQuery<HistoryDoodlesQuery, QueryHistoryDoodlesArgs>(historyDoodlesQuery, {
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

const historyDoodlesQuery = gql`
  query historyDoodles($month: Int, $day: Int) {
    historyDoodles(month: $month, day: $day) {
      id
      title
      url
    }
  }
`

const styles = StyleSheet.create({
  reel: {
    padding: 16,
    paddingBottom: 4,
  },
})

export default HistoryReel
