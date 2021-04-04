import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { without } from 'lodash'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes } from '~client/navigation/Routes'
import Search from '~client/partials/Search'
import { setTags, useFilters } from '~client/store/filters'

const TagsSearch: FC = () => {
  const { tags } = useRoute<RouteProp<Routes, 'TagsSearch'>>().params

  const { goBack } = useNavigation()

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

export interface TagsSearchRouteProps {
  tags: string[]
}

export default TagsSearch
