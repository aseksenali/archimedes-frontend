import { MutableRefObject } from 'react'
import { MedicSchedule } from '../../interfaces/MedicSchedule'
import { MedicData } from '../../interfaces/MedicData'

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
    initialValue: Date
    selectedDate: Date
    onChange: (date: Date) => void
}

export type Filter = { id: string } & (TextFilter | WeekFilter)

export type FiltersList = {
    branchName: Array<string>
    workType: Array<string>
    specialtyName: Array<string>
    medicName: Array<string>
}

export type ScheduleOutletContext = {
    date: Date,
    filters: {
        medicName: string[]
        specialtyName: string[]
        workType: string[]
    },
    scheduleData: Array<MedicSchedule>,
    medicData: Array<MedicData>,
    specialties: Array<{ specialtyId: string, specialtyName: string }>
}