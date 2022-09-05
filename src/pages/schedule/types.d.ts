import { MutableRefObject } from 'react'
import { MedicData } from '../../interfaces/MedicData'
import { DateTime } from 'luxon'
import { MedicSchedule } from '../../interfaces/MedicSchedule'
import { AppointmentData } from '../../redux/interfaces/types'

export type WeekSchedule = {
    MONDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
    TUESDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
    WEDNESDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
    THURSDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
    FRIDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
    SATURDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
    SUNDAY: { workingHours: string, hasFreeWindows: boolean } | undefined
}

export type GroupedData = {
    specialtyId: string
    specialtyName: string
    rows: Array<{
        schedule?: MedicSchedule
        medic: MedicData
        appointments?: Array<AppointmentData>
    }>
}


export type DaySchedule = {
    schedule?: string
    hasFreeWindows?: boolean
    medicId: string
}

export type MedicScheduleRow = {
    medicId: string
    medicName: string
    branchId: string
    specialtyId: string
    specialtyName: string
    firstDay: DaySchedule
    secondDay: DaySchedule
    thirdDay: DaySchedule
    fourthDay: DaySchedule
    fifthDay: DaySchedule
    sixthDay: DaySchedule
    seventhDay: DaySchedule
}

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

export type FilterData = { id: string } & (TextFilter | WeekFilter)

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