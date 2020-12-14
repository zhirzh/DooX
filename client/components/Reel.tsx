import { NetworkStatus } from "@apollo/client"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Platform, RefreshControl } from "react-native"
import { useDoodlesQuery } from "~/types/graphql"
import { black } from "../colors"
import Card from "./Card"
import HistoryReel from "./HistoryReel"
import Separator from "./Separator"
import Space from "./Space"

const Reel: FC<Props> = ({ searchText }) => {
  const [separatorVisible, setSeparatorVisible] = useState(false)

  const { loading, data, networkStatus, fetchMore, refetch } = useDoodlesQuery({
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (loading) {
      return
    }

    refetch({ offset: 0, searchText })
  }, [searchText])

  const refetching = networkStatus === NetworkStatus.refetch

  return (
    <>
      {separatorVisible && <Separator />}

      <FlatList
        data={data?.doodles}
        keyExtractor={doodle => doodle.id}
        renderItem={({ item: doodle }) => <Card title={doodle.title} imageUrl={doodle.url} />}
        ItemSeparatorComponent={() => (
          <>
            <Space height={20} />
            <Separator />
          </>
        )}
        ListHeaderComponent={
          <>
            <HistoryReel />
            <Separator />
          </>
        }
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
            refreshing={refetching}
            onRefresh={() => {
              if (loading) {
                return
              }

              refetch({ searchText })
            }}
          />
        }
        onScroll={e => {
          setSeparatorVisible(e.nativeEvent.contentOffset.y > 1)
        }}
        onEndReached={() => {
          if (loading) {
            return
          }

          fetchMore({
            variables: { offset: data!.doodles.length },
          })
        }}
      />
    </>
  )
}

interface Props {
  searchText: string
}

export default Reel
