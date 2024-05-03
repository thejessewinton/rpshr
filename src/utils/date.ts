import dayjs, { type Dayjs } from 'dayjs'
import relative from 'dayjs/plugin/relativeTime'

dayjs.extend(relative)

export default dayjs

export const getDaysBetween = (start: Dayjs, end: Dayjs) => {
  const range = []
  let current = start
  while (!current.isAfter(end)) {
    range.push(current)
    current = current.add(1, 'days')
  }
  return range
}

export const getAllDaysInYear = () => {
  const year = dayjs().year()
  const currentDate = dayjs().startOf('year').toDate()
  const daysArray: Array<{ date: Dayjs; isFirstOfMonth: boolean }> = []

  while (currentDate.getFullYear() === year) {
    daysArray.push({
      date: dayjs(currentDate),
      isFirstOfMonth: currentDate.getDate() === 1
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return daysArray
}

export const normalizeDateString = (dateString?: string) => {
  if (!dateString) return dayjs().toDate()

  const normalizeDate = dateString.toLowerCase().trim()

  return normalizeDate === 'today'
    ? dayjs().toDate()
    : normalizeDate === 'yesterday'
      ? dayjs().subtract(1, 'day').toDate()
      : dayjs(dateString).toDate()
}
