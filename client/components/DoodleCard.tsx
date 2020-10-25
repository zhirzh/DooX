import React, { FC } from 'react'
import { Card } from 'react-native-paper'
import type { Doodle } from '~/client/screens/Home/query'
import DoodleCardImage from './DoodleCardImage'

type Props = {
  doodle: Doodle
}

const DoodleCard: FC<Props> = ({ doodle }) => {
  return (
    <Card>
      <Card.Title title={doodle.title} />
      <DoodleCardImage doodle={doodle} />
    </Card>
  )
}

export default DoodleCard
