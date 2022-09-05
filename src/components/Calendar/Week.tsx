import { WeekPickerWeekProps } from '../WeekPicker/types'
import clsx from 'clsx'
import React from 'react'
import Day from './Day'
import styles from './Week.module.scss'

const Week = ({ weekDays, selectedDate, currentMonth, onDayClick }: WeekPickerWeekProps) => {
    return (
        <div className={ clsx({
            [styles.week]: true,
            [styles.selected]: weekDays.contains(selectedDate),
        }) }>
            { weekDays.splitBy({ day: 1 }).map(value => value.start.startOf('day')).map(day => {
                return <Day key={ day.toMillis() } day={ day } selectedDate={ selectedDate }
                            currentMonth={ currentMonth }
                            onClick={ onDayClick(day) }/>
            }) }
        </div>
    )
}

export default Week