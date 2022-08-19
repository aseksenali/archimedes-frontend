import React from 'react'

interface CalendarSelectorHeaderProps {
    month: number
    year: number
    setMonth: (month: number) => void
    setYear: (year: number) => void
}

type DateRangeProps = {
    type: 'daterange'
    startDate: Date
    endDate: Date | undefined
    setStartDate: (date: Date) => void
    setEndDate: (date: Date) => void
}

type WeekProps = {
    type: 'week'
    selectedDate: Date
    setSelectedDate: (date: Date) => void
}

type CalendarSelectorBodyProps = {
    month: number
    year: number
    onClick: (date: Date) => ((event: React.MouseEvent<HTMLDivElement>) => void)
} & (DateRangeProps | Omit<WeekProps, 'setSelectedDate'>)

type CalendarProps =
    (DateRangeProps | Omit<WeekProps, 'setSelectedDate'>)
    & { onClick: (date: Date) => ((event: React.MouseEvent<HTMLDivElement>) => void) }

type DayWithMonth = {
    day: number,
    month: number
}

export type { CalendarSelectorBodyProps, CalendarSelectorHeaderProps, DayWithMonth, CalendarProps }