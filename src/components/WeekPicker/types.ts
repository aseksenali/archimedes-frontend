import React from 'react'

interface WeekPickerProps {
    initialValue: Date
    selectedDate: Date
    onChange: (date: Date) => void
}

interface WeekPickerDayProps {
    value: Date
    selectedDate: Date
    currentMonth: number
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface WeekPickerWeekProps {
    value: Array<Date>
    selectedDate: Date
    currentMonth: number
    onDayClick: (date: Date) => ((event: React.MouseEvent<HTMLDivElement>) => void)
}

export type { WeekPickerProps, WeekPickerDayProps, WeekPickerWeekProps }