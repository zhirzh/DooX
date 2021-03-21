import { StackScreenProps } from '@react-navigation/stack'
import { without } from 'lodash'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes } from '~client/navigation/Routes'
import Search from '~client/partials/Search'
import { setTags, useFilters } from '~client/store/filters'

const TagsSearch: FC<Props> = ({ navigation, route }) => {
  const { tags } = route.params

  const { goBack } = navigation

  const filters = useFilters()

  const dispatch = useDispatch()

  const [selectedTags, setSelectedTags] = useState(filters.tags)

  return (
    <Search
      placeholder="Search tags"
      selected={selectedTags}
      options={tags}
      onClose={() => {
        goBack()
        dispatch(setTags(selectedTags))
      }}
      onSelect={tag => {
        setSelectedTags(
          selectedTags.includes(tag) ? without(selectedTags, tag) : selectedTags.concat(tag)
        )
      }}
    />
  )
}

export interface TagsSearchNavigationProps {
  tags: string[]
}

interface Props extends StackScreenProps<Routes, 'TagsSearch'> {}

export default TagsSearch
