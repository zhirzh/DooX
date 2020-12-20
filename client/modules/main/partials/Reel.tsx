import { NetworkStatus } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Platform, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import { black } from '~client/colors'
import Separator from '~client/components/Separator'
import Space from '~client/components/Space'
import { StoreState } from '~client/store'
import { useDoodlesQuery } from '~types/graphql'
import Card from '../components/Card'
import HistoryReel from './HistoryReel'

const Reel: FC<Props> = ({}) => {
  const [separatorVisible, setSeparatorVisible] = useState(false)

  const filters = useSelector((state: StoreState) => state.filters)

  const { loading, data, networkStatus, fetchMore, refetch } = useDoodlesQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      searchText: filters.searchText,
      type: filters.doodleType,
      countries: filters.countries,
      tags: filters.tags,
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
  })

  useEffect(() => {
    if (loading) {
      return
    }

    refetch()
  }, [filters])

  const refetching = networkStatus === NetworkStatus.refetch

  return (
    <>
      {separatorVisible && <Separator />}

      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
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
              size={Platform.select({ android: 'large' })}
              color={black}
              style={{ marginVertical: 16 }}
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

              refetch()
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
            variables: {
              offset: data!.doodles.length,
            },
          })
        }}
      />
    </>
  )
}

interface Props {}

export default Reel
