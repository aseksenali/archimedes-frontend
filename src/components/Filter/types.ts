import { MutableRefObject } from 'react'

type WeekFilterProps = {
    initialValue: Date
    type: 'week'
    selectedDate: Date
    onChange: (date: Date) => void
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
    initialValue: Date
    type: 'dateRange'
    onStartDateChange: (date: Date) => void
    onEndDateChange: (date: Date) => void
}

export type FilterProps =
    | WeekFilterProps
    | TextFilterProps
    | DateRangeFilterProps