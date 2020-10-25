import { useQuery } from '@apollo/client'
import { StackScreenProps } from '@react-navigation/stack'
import { property } from 'lodash-es'
import React, { FC } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { ActivityIndicator, useTheme as usePaperTheme } from 'react-native-paper'
import DoodleCard from '~/client/components/DoodleCard'
import { GetRoutes } from '~/client/Routes'
import query, { QueryData, QueryVariables } from './query'
import { RouteProp } from '@react-navigation/native'

declare module '~/client/Routes' {
  interface Routes {
    Home: undefined
  }
}

const initialQueryVariables: QueryVariables = {
  limit: 10,
  offset: 0,
}

const lazyLoadThreshold = 1 // multiples of screen

type Props = RouteProp<GetRoutes, 'Home'> & StackScreenProps<GetRoutes, 'Home'>

const Home: FC<Props> = () => {
  const { colors } = usePaperTheme()

  const { data, loading, fetchMore, refetch } = useQuery<QueryData, QueryVariables>(query, {
    variables: initialQueryVariables,
    notifyOnNetworkStatusChange: true,
  })

  return (
    <FlatList
      data={data?.doodles}
      keyExtractor={property('id')}
      renderItem={({ item: doodle }) => <DoodleCard doodle={doodle} />}
      ListFooterComponent={
        data && data.doodles.length > 0 ? (
          <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} />
        ) : null
      }
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          tintColor={colors.primary}
          refreshing={loading}
          onRefresh={() => {
            if (loading) {
              return
            }

            refetch()
          }}
        />
      }
      onEndReachedThreshold={lazyLoadThreshold}
      onEndReached={() => {
        if (loading) {
          return
        }

        fetchMore({
          variables: {
            offset: data?.doodles.length,
          },
        })
      }}
    />
  )
}

export default Home
