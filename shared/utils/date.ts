import { format } from 'date-fns'

export const stringifyDate = (date: Date | number) => format(date, 'yyyy-MM-dd')

export const parseDateString = (dateString: string) => new Date(dateString)
