import React from 'react'
import { DateTime } from 'luxon'

export interface CalendarSelectorHeaderProps {
    monthAndYear: DateTime
    setMonthAndYear: (dateTime: DateTime) => void
}

export type DateRangeProps = {
    type: 'dateRange'
    startDate: DateTime
    endDate: DateTime | undefined
    setStartDate: (date: DateTime) => void
    setEndDate: (date: DateTime) => void
}

export type WeekProps = {
    type: 'week'
    selectedDate: DateTime
    setSelectedDate: (date: DateTime) => void
}

export type CalendarSelectorBodyProps = {
    monthAndYear: DateTime
    onClick: (dateTime: DateTime) => ((event: React.MouseEvent<HTMLDivElement>) => void)
} & (DateRangeProps | Omit<WeekProps, 'setSelectedDate'>)

export type CalendarProps =
    (DateRangeProps | Omit<WeekProps, 'setSelectedDate'>)
    & { onClick: (date: DateTime) => ((event: React.MouseEvent<HTMLDivElement>) => void) }