import { DateRangeDayProps } from './types'
import { DateTime, Interval } from 'luxon'
import clsx from 'clsx'
import React from 'react'
import * as styled from './styles'

const Day = ({ day, startDate, endDate, currentMonth, onClick }: DateRangeDayProps) => {
    const isSelected = (date: DateTime): boolean => {
        return !!(endDate) && Interval.fromDateTimes(startDate, endDate).contains(date)
    }

    const notCurrentMonth = (date: DateTime): boolean => {
        return date.month !== currentMonth
    }

    return (
        <styled.Day className={ clsx({
            'selected': isSelected(day),
            'selection_border': +startDate === +day || (endDate && +endDate === +day),
            'different_month': notCurrentMonth(day),
        }) } onClick={ onClick }>
            { day.day }
        </styled.Day>
    )
}

export default Day