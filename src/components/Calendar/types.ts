import React from 'react'
import { DateTime } from 'luxon'

interface CalendarSelectorHeaderProps {
    monthAndYear: DateTime
    setMonthAndYear: (dateTime: DateTime) => void
}

type DateRangeProps = {
    type: 'dateRange'
    startDate: DateTime
    endDate: DateTime | undefined
    setStartDate: (date: DateTime) => void
    setEndDate: (date: DateTime) => void
}

type WeekProps = {
    type: 'week'
    selectedDate: DateTime
    setSelectedDate: (date: DateTime) => void
}

type CalendarSelectorBodyProps = {
    monthAndYear: DateTime
    onClick: (dateTime: DateTime) => ((event: React.MouseEvent<HTMLDivElement>) => void)
} & (DateRangeProps | Omit<WeekProps, 'setSelectedDate'>)

type CalendarProps =
    (DateRangeProps | Omit<WeekProps, 'setSelectedDate'>)
    & { onClick: (date: DateTime) => ((event: React.MouseEvent<HTMLDivElement>) => void) }

type DayWithMonth = {
    day: number,
    month: number
}

export type { CalendarSelectorBodyProps, CalendarSelectorHeaderProps, DayWithMonth, CalendarProps }