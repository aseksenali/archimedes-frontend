export type WorkingHours = { startTime: string, endTime: string }
export type SpecialCaseDay = { date: string, branchId: string, workingHours: WorkingHours }
export type Holiday = { branchId: string, startDate: string, endDate: string }
export type WeekDays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

interface MedicSchedule {
    medicId: string
    specialtyIds: Array<string>
    minimalAppointmentPeriod: number
    branchId: string
    startDate: string
    endDate?: string
    workingDays: Partial<Record<Uppercase<WeekDays>, WorkingHours>>
    specialDays: Array<SpecialCaseDay>
    holidays: Array<Holiday>
}

export type { MedicSchedule }