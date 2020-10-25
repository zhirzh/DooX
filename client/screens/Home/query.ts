import { gql } from '@apollo/client'
import { Doodle as _Doodle } from '~/data/doodles'

export type Doodle = Pick<
  _Doodle,
  | 'id'
  | 'title'
  | 'type'
  | 'high_res_url'
  | 'call_to_action_image_url'
  | 'standalone_html'
  | 'youtube_id'
>

export type QueryData = {
  doodles: Doodle[]
}

export type QueryVariables = {
  limit?: number
  offset?: number
}

const query = gql`
  query($limit: Int, $offset: Int) {
    doodles(limit: $limit, offset: $offset) {
      id
      title
      type
      high_res_url
      call_to_action_image_url
      standalone_html
      youtube_id
    }
  }
`

export default query
