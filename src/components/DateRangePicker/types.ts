import React from 'react'

interface DateRangePickerProps {
    initialValue: Date
    showInputs: boolean
}

interface DateRangeDayProps {
    value: Date
    startDate: Date
    endDate: Date | undefined
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
    currentMonth: number
}

interface DropdownProps {
    isOpen: boolean
}

export type { DateRangePickerProps, DropdownProps, DateRangeDayProps }