import { WeekPickerDayProps } from '../WeekPicker/types'
import clsx from 'clsx'
import { DateTime } from 'luxon'
import React from 'react'
import styles from './Day.module.scss'

const Day = ({ day, selectedDate, currentMonth, onClick }: WeekPickerDayProps) => {
    return (
        <div className={ clsx({
            [styles.day]: true,
            [styles.selected]: +day === +selectedDate,
            [styles.first]: +day === +(selectedDate.startOf('week')),
            [styles.last]: +day === +(selectedDate.endOf('week').startOf('day')),
            [styles.different_month]: day.month !== currentMonth,
            [styles.today]: +day === +DateTime.utc().startOf('day'),
        }) } onClick={ onClick }>
            { day.day }
        </div>
    )
}

export default Day