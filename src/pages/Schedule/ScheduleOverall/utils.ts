import { MedicSchedule } from '../../../interfaces/MedicSchedule'
import { WeekSchedule } from './types'
import { getWeekForDay, timeToTimeString } from '../../../helpers/DateHelper'

const removeTime = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export const workingHours = (date: Date, data: MedicSchedule): WeekSchedule => {
    const week = getWeekForDay(date)
    return week.reduce((result: WeekSchedule, day) => {
        const weekDayNames = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY' ] as Array<keyof typeof result>
        const weekDay = weekDayNames[(day.getDay() + 6) % 7]
        const holidays = data.holidays
        if (holidays.find(holiday => removeTime(new Date(holiday.startDate)) <= day && removeTime(new Date(holiday.endDate)) >= day)) return {
            ...result,
            [weekDay]: 'Выходной',
        }
        const specialDays = data.specialDays
        const specialDay = specialDays.find(specialDay => removeTime(new Date(specialDay.date)) === removeTime(day))
        if (specialDay) return {
            ...result,
            [weekDay]: `${ specialDay.workingHours.startTime }-${ specialDay.workingHours.endTime }`,
        }
        let tmp = {}
        // for (const scheduleWeekDay of Object.keys(data.workingDays) as Array<keyof typeof data.workingDays>) {
        const schedule = data.workingDays[weekDay]
        if (!!schedule)
            tmp = {
                ...tmp,
                [weekDay]: `${ timeToTimeString(new Date(schedule.startTime)) } - ${ timeToTimeString(new Date(schedule.endTime)) }`,
            }
        else {
            tmp = { ...tmp, [weekDay]: 'Выходной' }
        }
        // }
        return { ...result, ...tmp }
    }, {
        MONDAY: undefined,
        TUESDAY: undefined,
        WEDNESDAY: undefined,
        THURSDAY: undefined,
        FRIDAY: undefined,
        SATURDAY: undefined,
        SUNDAY: undefined,
    } as WeekSchedule)
}
