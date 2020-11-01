import { useQuery } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { property } from 'lodash-es'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, RefreshControl } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import DoodleCard from '~/client/components/DoodleCard'
import { animationConfig } from '~/client/lib/constants'
import { GetRoutes } from '~/client/Routes'
import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'
import query, { QueryData, QueryVariables } from './query'

declare module '~/client/Routes' {
  interface Routes {
    Home: {
      search: boolean
    }
  }
}

const initialQueryVariables: QueryVariables = {
  limit: 10,
  offset: 0,
}

const lazyLoadThreshold = 1 // multiples of screen

type Props = RouteProp<GetRoutes, 'Home'> & StackScreenProps<GetRoutes, 'Home'> & {}

const Home: FC<Props> = ({ navigation }) => {
  const [searchMode, setSearchMode] = useState(false)

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      ...animationConfig,
      toValue: searchMode ? 1 : 0,
    }).start()
  }, [searchMode])

  const { colors } = useTheme()

  const { data, loading, fetchMore, refetch } = useQuery<QueryData, QueryVariables>(query, {
    variables: initialQueryVariables,
    notifyOnNetworkStatusChange: true,
  })

  return (
    <>
      <HomeHeader
        animatedValue={animatedValue}
        shouldHandleBackPress={navigation.isFocused() && searchMode}
        openSearch={() => {
          setSearchMode(true)
        }}
        closeSearch={() => {
          setSearchMode(false)
        }}
      />

      <SafeAreaView edges={['left', 'right']} style={{ backgroundColor: colors.surface }}>
        <FlatList
          data={data?.doodles}
          keyExtractor={property('id')}
          style={{
            backgroundColor: colors.surface,
          }}
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
      </SafeAreaView>

      <HomeFooter animatedValue={animatedValue} />
    </>
  )
}

export default Home
