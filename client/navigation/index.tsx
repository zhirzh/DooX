import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { FC } from 'react'
import { black, shadowOpacity } from '~client/colors'
import CountriesSearch from '~client/modules/filters/modals/CountriesSearch'
import Filters from '~client/modules/filters/modals/Filters'
import TagsSearch from '~client/modules/filters/modals/TagsSearch'
import Root from '~client/modules/root/screens/Root'
import { Routes } from './Routes'

const { Navigator, Screen } = createStackNavigator<Routes>()

const Rootstack: FC = () => {
  return (
    <Navigator headerMode="none" mode="modal" screenOptions={screenOptions}>
      <Screen name="Root" component={Root} />
      <Screen name="Filters" component={Filters} />
      <Screen name="CountriesSearch" component={CountriesSearch} />
      <Screen name="TagsSearch" component={TagsSearch} />
    </Navigator>
  )
}

const screenOptions: StackNavigationOptions = {
  cardOverlayEnabled: true,

  cardStyle: {
    backgroundColor: 'transparent',
  },

  cardStyleInterpolator: props => {
    const interpolationStyles = CardStyleInterpolators.forVerticalIOS(props)

    interpolationStyles.overlayStyle = {
      backgroundColor: black,
      opacity: props.current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, shadowOpacity],
      }),
    }

    return interpolationStyles
  },
}

export default Rootstack
