import React from 'react'
import { DateTime } from 'luxon'

interface DateRangePickerProps {
    initialValue: DateTime
    showInputs: boolean
}

interface DateRangeDayProps {
    day: DateTime
    startDate: DateTime
    endDate: DateTime | undefined
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
    currentMonth: number
}

interface DropdownProps {
    isOpen: boolean
}

export type { DateRangePickerProps, DropdownProps, DateRangeDayProps }