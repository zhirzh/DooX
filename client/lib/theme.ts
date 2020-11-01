import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native'
import { merge } from 'lodash-es'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/src/types'

export type Theme = PaperTheme & NavigationTheme
export const DefaultTheme: Theme = merge({}, PaperDefaultTheme, NavigationDefaultTheme)
export const DarkTheme: Theme = merge({}, PaperDarkTheme, NavigationDarkTheme)
