import { CalendarSelectorBodyProps } from './types'
import { Day as DateRangePickerDay } from '../DateRangePicker/DateRangePicker'
import { Week } from '../WeekPicker/WeekPicker'
import React, { useMemo } from 'react'
import * as styled from './styles'
import { Interval } from 'luxon'

const CalendarBody = (props: CalendarSelectorBodyProps) => {
    const weekDays = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ]

    const visibleDays = useMemo(() => Interval.fromDateTimes(props.monthAndYear.startOf('month').startOf('week'),
            props.monthAndYear.endOf('month').endOf('week')),
        [ props.monthAndYear ],
    )

    return (
        <styled.CalendarWrapper>
            <styled.WeekHeader>
                { weekDays.map(value => (
                    <styled.WeekDay key={ value }>{ value }</styled.WeekDay>
                )) }
            </styled.WeekHeader>
            <styled.Month>
                { visibleDays.splitBy({ week: 1 }).map((week) => {
                    return (() => {
                        switch (props.type) {
                            case 'dateRange':
                                return (
                                    week.splitBy({ day: 1 }).map(value => {
                                        const day = value.start.startOf('day')
                                        return <DateRangePickerDay key={ day.toMillis() }
                                                                   day={ day }
                                                                   startDate={ props.startDate }
                                                                   endDate={ props.endDate }
                                                                   onClick={ props.onClick(day) }
                                                                   currentMonth={ props.monthAndYear.month }/>
                                    })
                                )
                            case 'week':
                                return (
                                    <Week key={ week.start.weekNumber } weekDays={ week }
                                          selectedDate={ props.selectedDate }
                                          currentMonth={ props.monthAndYear.month } onDayClick={ props.onClick }/>
                                )
                            default:
                                return <></>
                        }
                    })()
                }) }
            </styled.Month>
        </styled.CalendarWrapper>
    )
}

export default CalendarBody