type WorkingHours = { startTime: string, endTime: string }
type SpecialCaseDay = { date: string, branchId: string, workingHours: WorkingHours }
type Holiday = { branchId: string, startDate: string, endDate: string }

interface MedicSchedule {
    medicId: string
    specialtyIds: Array<string>
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