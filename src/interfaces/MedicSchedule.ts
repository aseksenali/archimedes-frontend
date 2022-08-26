export type WorkingHours = { startTime: string, endTime: string }
export type SpecialCaseDay = { date: string, branchId: string, workingHours: WorkingHours }
export type Holiday = { branchId: string, startDate: string, endDate: string }

interface MedicSchedule {
    medicId: string
    specialtyIds: Array<string>
    minimalAppointmentPeriod: number
    branchId: string
    startDate: string
    endDate?: string
    workingDays: {
        MONDAY?: WorkingHours
        TUESDAY?: WorkingHours
        WEDNESDAY?: WorkingHours
        THURSDAY?: WorkingHours
        FRIDAY?: WorkingHours
        SATURDAY?: WorkingHours
        SUNDAY?: WorkingHours
    }
    specialDays: Array<SpecialCaseDay>
    holidays: Array<Holiday>
}

export type { MedicSchedule }