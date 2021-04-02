import React, { FC, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Platform, RefreshControl, StyleSheet } from 'react-native'
import { black } from '~client/colors'
import Separator from '~client/components/Separator'
import Space from '~client/components/Space'
import { useFilters } from '~client/store/filters'
import { useDoodlesQuery } from '~types/graphql'
import Card from '../components/Card'
import HistoryReel from './HistoryReel'

const Reel: FC = () => {
  const filters = useFilters()

  const { data, loading, fetchMore, refetch } = useDoodlesQuery({
    notifyOnNetworkStatusChange: true,
    variables: { offset: 0, ...filters },
  })

  useEffect(() => {
    refetch()
  }, [filters])

  const doodles = data?.doodles

  const [refreshing, setRefreshing] = useState(false)
  const [fetchingMore, setFetchingMore] = useState(false)

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false)
    }

    if (fetchingMore) {
      setFetchingMore(false)
    }
  }, [loading])

  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <>
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [0, 5],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Separator />
      </Animated.View>

      <Animated.FlatList
        data={doodles}
        keyExtractor={doodle => doodle.id}
        contentContainerStyle={styles.list}
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
          <ActivityIndicator
            animating={fetchingMore}
            color={black}
            size={Platform.select({ android: 'large' })}
            style={{ marginTop: 12, marginBottom: 20 }}
          />
        }
        ListEmptyComponent={
          <ActivityIndicator
            size={Platform.select({ android: 'large' })}
            color={black}
            style={{ flexGrow: 1 }}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)

              refetch()
            }}
          />
        }
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        onEndReached={() => {
          setFetchingMore(true)

          fetchMore({
            variables: { offset: doodles?.length },
          })
        }}
        renderItem={({ item: doodle }) => <Card title={doodle.title} imageUrl={doodle.url} />}
      />
    </>
  )
}

const idExtractor = (x: any) => x.id

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
})

export default Reel
