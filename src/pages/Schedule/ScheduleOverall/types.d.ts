import { MedicData } from '../../../interfaces/MedicData'
import { MedicSchedule } from '../../../interfaces/MedicSchedule'
import { AppointmentData } from '../../../redux/interfaces/types'

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
    hasFreeWindows: boolean
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