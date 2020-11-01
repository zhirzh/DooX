import { useBackHandler, useLayout } from '@react-native-community/hooks'
import React, { createRef, FC } from 'react'
import { Animated, Platform, StyleSheet, TextInput as RNTextInput, View } from 'react-native'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Subheading, Title, useTheme } from 'react-native-paper'
import Icon from 'react-native-paper/src/components/Icon'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { padding } from '~/client/lib/constants'
import { Theme } from '~/client/lib/theme'
import { DispatchProps, StoreState } from '~/client/store'
import { resetSearch, setSearch } from '~/client/store/search'

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchBar: {
    elevation: 0,
    position: 'absolute',
    bottom: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  inputWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    marginTop: padding.top,
    paddingVertical: Platform.select({ ios: 8, default: 4 }),
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  cancel: {
    marginLeft: 16,
  },
})

const mapStateToProps = ({ search: { searchText } }: StoreState) => ({ searchText })

const mapDispatchToProps = { setSearch, resetSearch }

type HeaderProps = ReturnType<typeof mapStateToProps> &
  DispatchProps<typeof mapDispatchToProps> & {
    animatedValue: Animated.Value
    shouldHandleBackPress: boolean
    openSearch: () => any
    closeSearch: () => any
  }

const Header: FC<HeaderProps> = ({
  searchText,
  animatedValue,
  shouldHandleBackPress,
  openSearch,
  closeSearch,
}) => {
  useBackHandler(() => {
    if (shouldHandleBackPress) {
      closeSearch()
      return true
    }

    return false
  })

  const { height, onLayout } = useLayout()
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height - 1], // (height - 1) to show bototm border
  })

  const { left, top, right } = useSafeAreaInsets()
  const paddingLeft = left || padding.left
  const paddingRight = right || padding.right
  const paddingTop = top || padding.top
  const paddingBottom = padding.bottom

  const { colors, fonts } = useTheme() as Theme

  const inputRef = createRef<RNTextInput>()

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            height,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingBottom,
          },
        ]}
      >
        <Title>Home</Title>

        <TouchableWithoutFeedback onPress={openSearch}>
          <Icon source="magnify" size={24} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        onLayout={onLayout}
        style={[
          styles.searchBar,
          {
            backgroundColor: colors.surface,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingBottom,
          },
          { transform: [{ translateY }] },
        ]}
      >
        <View style={[styles.inputWrapper, { backgroundColor: colors.background }]}>
          <TextInput
            ref={inputRef}
            enablesReturnKeyAutomatically
            placeholder="Search"
            value={searchText}
            returnKeyType="search"
            style={{
              ...fonts.regular,
              color: colors.text,
              fontSize: 16,
            }}
            clearButtonMode="always"
            onChangeText={searchText => {
              setSearch({ searchText })
            }}
          />
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            inputRef.current?.blur()
            closeSearch()
            resetSearch()
          }}
        >
          <Subheading style={[styles.cancel, { ...fonts.regular, color: colors.primary }]}>
            Cancel
          </Subheading>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
