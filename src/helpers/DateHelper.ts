import { monthNames } from '../constants/calendarConstants'

export const timeToTimeString = (date: Date): string => {
    return date.toLocaleTimeString().substring(0, 5)
}
export const getWeekForDay = (date: Date): Array<Date> => {
    const result = [] as Array<Date>
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    day.setDate(day.getDate() - (day.getDay() + 6) % 7)
    for (let i = 0; i < 7; i++) {
        result.push(new Date(day.getTime()))
        day.setDate(day.getDate() + 1)
    }
    return result
}

export const convertToDateString = (date: Date): string => {
    return `${ date.getDate() } ${ monthNames[date.getMonth()] } ${ date.getFullYear() }г.`
}