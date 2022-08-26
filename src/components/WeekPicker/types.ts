import React from 'react'
import { DateTime, Interval } from 'luxon'

interface WeekPickerProps {
    initialValue: DateTime
    selectedDate: DateTime
    onChange: (date: DateTime) => void
}

interface WeekPickerDayProps {
    day: DateTime
    selectedDate: DateTime
    currentMonth: number
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface WeekPickerWeekProps {
    weekDays: Interval
    selectedDate: DateTime
    currentMonth: number
    onDayClick: (date: DateTime) => ((event: React.MouseEvent<HTMLDivElement>) => void)
}

export type { WeekPickerProps, WeekPickerDayProps, WeekPickerWeekProps }