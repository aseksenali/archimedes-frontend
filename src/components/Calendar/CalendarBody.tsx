import { CalendarSelectorBodyProps } from './types'
import Day from '../DateRangePicker/Day'
import React, { useMemo } from 'react'
import { Interval } from 'luxon'
import { weekDays } from '../../constants/dateConstants'
import Week from './Week'
import styles from './CalendarBody.module.scss'

const CalendarBody = (props: CalendarSelectorBodyProps) => {
    const visibleWeeks = useMemo(() => Interval.fromDateTimes(props.monthAndYear.startOf('month').startOf('week'),
            props.monthAndYear.endOf('month').endOf('week')).splitBy({ week: 1 }),
        [ props.monthAndYear ])

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.week_header }>
                { weekDays.map(value => (
                    <div className={ styles.week_day } key={ value }>{ value }</div>
                )) }
            </div>
            <div className={ styles.month }>
                { visibleWeeks.map((week) => {
                    return (() => {
                        switch (props.type) {
                            case 'dateRange':
                                return (
                                    week.splitBy({ day: 1 }).map(value => {
                                        const day = value.start.startOf('day')
                                        return <Day key={ day.toMillis() }
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
            </div>
        </div>
    )
}

export default CalendarBody