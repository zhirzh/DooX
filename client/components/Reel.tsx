import { gql, useQuery } from "@apollo/client"
import React, { FC, useState } from "react"
import { ActivityIndicator, FlatList, Platform, RefreshControl, View } from "react-native"
import { DoodlesQuery, DoodlesQueryVariables } from "~/types/graphql"
import { black, gray } from "../colors"
import Card from "./Card"
import Space from "./Space"

const Reel: FC = () => {
  const [dividerVisible, setDividerVisible] = useState(false)

  const { loading, data, fetchMore, refetch } = useQuery<DoodlesQuery, DoodlesQueryVariables>(
    doodlesQuery,
    {
      notifyOnNetworkStatusChange: true,
      variables: { offset: 0 },
    }
  )

  const [refreshing, setRefreshing] = useState(false)
  if (refreshing && !loading) {
    setRefreshing(false)
  }

  return (
    <>
      <View
        style={{
          height: 1,
          backgroundColor: dividerVisible ? gray : "transparent",
        }}
      />

      <FlatList
        data={data?.doodles}
        keyExtractor={doodle => doodle.id}
        renderItem={({ item: doodle }) => <Card title={doodle.title} imageUrl={doodle.url} />}
        ItemSeparatorComponent={() => <Space height={20} />}
        ListFooterComponent={
          loading && (
            <ActivityIndicator
              size={Platform.select({ android: "large" })}
              color={black}
              style={{ paddingVertical: 16 }}
            />
          )
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
          setDividerVisible(e.nativeEvent.contentOffset.y > 0)
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

const doodlesQuery = gql`
  query doodles($offset: Int) {
    doodles(offset: $offset, limit: 4) {
      id
      title
      url
    }
  }
`

export default Reel
