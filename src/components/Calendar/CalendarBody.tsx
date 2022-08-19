import { CalendarSelectorBodyProps } from './types'
import { Day as DateRangePickerDay } from '../DateRangePicker/DateRangePicker'
import { Week } from '../WeekPicker/WeekPicker'
import React from 'react'
import * as styled from './styles'

const weekNumber = (date: Date): number => {
    const firstJanuary = new Date(date.getFullYear(), 0, 1)
    const dayNr = Math.ceil((date.getTime() - firstJanuary.getTime()) / (24 * 60 * 60 * 1000))
    return Math.ceil((dayNr + firstJanuary.getDay()) / 7)
}

const CalendarBody = (props: CalendarSelectorBodyProps) => {
    const weekDays = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ]

    const day = new Date(props.year, props.month)
    day.setDate(day.getDate() - (day.getDay() + 6) % 7)
    const weeks = []
    let tmp = []
    while (day.getFullYear() * 100 + day.getMonth() <= props.year * 100 + props.month) {
        if ((day.getDay() + 6) % 7 === 0) {
            weeks.push(tmp)
            tmp = []
        }
        tmp.push(new Date(day.getTime()))
        day.setDate(day.getDate() + 1)
    }

    while ((day.getDay() + 6) % 7 !== 0) {
        tmp.push(new Date(day.getTime()))
        day.setDate(day.getDate() + 1)
    }

    weeks.push(tmp)

    return (
        <styled.CalendarWrapper>
            <styled.WeekHeader>
                { weekDays.map(value => (
                    <styled.WeekDay key={ value }>{ value }</styled.WeekDay>
                )) }
            </styled.WeekHeader>
            <styled.Month>
                { weeks.map((week) => {
                    if (week.length === 0) return null
                    return (
                        (() => {
                            switch (props.type) {
                                case 'daterange':
                                    return (
                                        week.map(value => (
                                            <DateRangePickerDay key={ value.getTime() } value={ value }
                                                                startDate={ props.startDate }
                                                                endDate={ props.endDate }
                                                                onClick={ props.onClick(value) }
                                                                currentMonth={ props.month }/>
                                        ))
                                    )
                                case 'week':
                                    return (
                                        <Week key={ weekNumber(week[0]) } value={ week }
                                              selectedDate={ props.selectedDate }
                                              currentMonth={ props.month } onDayClick={ props.onClick }/>
                                    )
                                default:
                                    return <></>
                            }
                        })())
                }) }
            </styled.Month>
        </styled.CalendarWrapper>
    )
}

export default CalendarBody