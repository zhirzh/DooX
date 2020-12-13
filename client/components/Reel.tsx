import React, { FC, useState } from "react"
import { ActivityIndicator, FlatList, Platform, RefreshControl } from "react-native"
import { useDoodlesQuery } from "../../types/graphql"
import { black } from "../colors"
import Card from "./Card"
import HistoryReel from "./HistoryReel"
import Separator from "./Separator"
import Space from "./Space"

const Reel: FC = () => {
  const [separatorVisible, setSeparatorVisible] = useState(false)

  const { loading, data, fetchMore, refetch } = useDoodlesQuery({
    notifyOnNetworkStatusChange: true,
    variables: { offset: 0 },
  })

  const [refreshing, setRefreshing] = useState(false)
  if (refreshing && !loading) {
    setRefreshing(false)
  }

  return (
    <>
      {separatorVisible && <Separator />}

      <FlatList
        data={data?.doodles}
        keyExtractor={doodle => doodle.id}
        renderItem={({ item: doodle }) => <Card title={doodle.title} imageUrl={doodle.url} />}
        ItemSeparatorComponent={() => <Space height={20} />}
        ListHeaderComponent={<HistoryReel />}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size={Platform.select({ android: "large" })}
              color={black}
              style={{ paddingVertical: 16 }}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              refetch({ offset: 1 })
              setRefreshing(true)
            }}
          />
        }
        onScroll={e => {
          setSeparatorVisible(e.nativeEvent.contentOffset.y > 5)
        }}
        onEndReached={() => {
          if (!loading) {
            fetchMore({
              variables: { offset: data!.doodles.length },
            })
          }
        }}
      />
    </>
  )
}

export default Reel
