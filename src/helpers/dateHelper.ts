import { DateTime, Interval } from 'luxon'
import { Holiday, SpecialCaseDay, WorkingHours } from '../interfaces/MedicSchedule'

declare module 'luxon/src/datetime' {
    export interface DateTime {
        convertToUTC(): DateTime

        convertFromUTC(): DateTime

        findWorkingHours(schedule: {
            MONDAY?: WorkingHours
            TUESDAY?: WorkingHours
            WEDNESDAY?: WorkingHours
            THURSDAY?: WorkingHours
            FRIDAY?: WorkingHours
            SATURDAY?: WorkingHours
            SUNDAY?: WorkingHours
        }): Interval | undefined

        findSpecialDay(specialDays: Array<SpecialCaseDay>): Interval | undefined

        isHoliday(holidays: Array<Holiday>): boolean
    }
}

declare module 'luxon/src/interval' {
    export interface Interval {
        toLocaleString(locale: string): string
    }
}

Interval.prototype.toLocaleString = function (locale: string): string {
    const start = this.start.setLocale(locale)
    const end = this.end.setLocale(locale)
    if (start.month === end.month) {
        return `${ start.toFormat('dd') } - ${ end.toFormat('dd') } ${ start.toFormat('MMMM') } ${ start.toFormat('yyyy') } г.`
    } else if (start.year === end.year) {
        return `${ start.toFormat('dd') } ${ start.toFormat('MMM') } - ${ end.toFormat('dd') } ${ end.toFormat('MMM') } ${ start.toFormat('yyyy') } г.`
    } else {
        return `${ start.toFormat('dd') } ${ start.toFormat('MMM') } ${ start.toFormat('yy') } г. - ${ end.toFormat('dd') } ${ end.toFormat('MMM') } ${ end.toFormat('yy') } г.`
    }
}

DateTime.prototype.convertToUTC = function (): DateTime {
    return this.plus({ minutes: this.offset }).toUTC()
}

DateTime.prototype.isHoliday = function (holidays): boolean {
    const holidayIntervals = holidays.map(holiday => {
        const holidayStart = DateTime.fromISO(holiday.startDate).convertToUTC().startOf('day')
        const holidayEnd = DateTime.fromISO(holiday.endDate).convertToUTC().endOf('day')
        return Interval.fromDateTimes(holidayStart, holidayEnd)
    })
    return holidayIntervals.some(interval => interval.contains(this))
}

DateTime.prototype.findSpecialDay = function (specialDays) {
    const specialDay = specialDays.find(specialDay => DateTime.fromISO(specialDay.date).convertFromUTC().hasSame(this, 'day'))
    if (!specialDay) return undefined
    const workingStartTime =
        DateTime.fromMillis(new Date(specialDay.workingHours.startTime).getTime(), { zone: 'utc' }).set({
            year: this.year,
            month: this.month,
            day: this.day,
        })
    const workingEndTime =
        DateTime.fromISO(specialDay.workingHours.endTime, { zone: 'utc' }).set({
            year: this.year,
            month: this.month,
            day: this.day,
        })
    return Interval.fromDateTimes(workingStartTime, workingEndTime)
}

DateTime.prototype.findWorkingHours = function (workingWeek) {
    const weekDayNames = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY' ] as Array<keyof typeof workingWeek>
    const weekDaySchedule = workingWeek[weekDayNames[this.weekday - 1]]
    const workingStartTime = weekDaySchedule ?
        DateTime.fromMillis(new Date(weekDaySchedule.startTime).getTime(), { zone: 'utc' }).set({
            year: this.year,
            month: this.month,
            day: this.day,
        }) :
        this.startOf('day')
    const workingEndTime = weekDaySchedule ?
        DateTime.fromISO(weekDaySchedule.endTime, { zone: 'utc' }).set({
            year: this.year,
            month: this.month,
            day: this.day,
        }) :
        this.startOf('day')
    return Interval.fromDateTimes(workingStartTime, workingEndTime)
}

DateTime.prototype.convertFromUTC = function (): DateTime {
    return this.minus({ minutes: this.offset }).toUTC()
}