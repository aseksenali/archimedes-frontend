import { DateTime } from 'luxon'
import { MutableRefObject } from 'react'

type WeekFilterProps = {
    initialValue: DateTime
    type: 'week'
    selectedDate: DateTime
    onChange: (date: DateTime) => void
}

type TextFilterProps = {
    label: string
    placeholder: string
    width: number
    possibleItems: Array<string>
    type: 'text'
    inputRef: MutableRefObject<HTMLInputElement | null>
} & ({
    multipleSelect: false
    value: string
    onChange: (value: string) => void
} | {
    multipleSelect: true
    value: Array<string>
    onAddElement: (value: string) => void
    onRemoveElement: (value: string) => void
})

type DateRangeFilterProps = {
    initialValue: DateTime
    type: 'dateRange'
    onStartDateChange: (date: DateTime) => void
    onEndDateChange: (date: DateTime) => void
}

export type FilterProps =
    | WeekFilterProps
    | TextFilterProps
    | DateRangeFilterProps