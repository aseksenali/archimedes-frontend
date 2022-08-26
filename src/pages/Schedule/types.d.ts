import { MutableRefObject } from 'react'
import { MedicData } from '../../interfaces/MedicData'
import { DateTime } from 'luxon'

type TextFilter = {
    type: 'text'
    placeholder: string
    label: string
    possibleItems: Array<string>
    width: number
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

type WeekFilter = {
    type: 'week'
    initialValue: DateTime
    selectedDate: DateTime
    onChange: (date: DateTime) => void
}

export type Filter = { id: string } & (TextFilter | WeekFilter)

export type FiltersList = {
    branchName: Array<string>
    specialtyName: Array<string>
    medicName: Array<string>
}

export type ScheduleOutletContext = {
    date: DateTime,
    filters: {
        medicName: string[]
        specialtyName: string[]
    },
    medicsData: Array<MedicData> | undefined,
    specialtiesData: Array<{ specialtyId: string, specialtyName: string }> | undefined
    branchesData: Array<{ branchId: string, branchName: string }> | undefined
}