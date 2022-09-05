import React from 'react'
import { DateTime } from 'luxon'

export interface DateRangePickerProps {
    initialValue: DateTime
    showInputs: boolean
}

export interface DateRangeDayProps {
    day: DateTime
    startDate: DateTime
    endDate: DateTime | undefined
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
    currentMonth: number
}