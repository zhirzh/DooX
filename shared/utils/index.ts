import { difference } from 'lodash'

export const includesAll = <T>(list: T[], sublist: T[]) => difference(sublist, list).length === 0
