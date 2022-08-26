export type AppointmentData = {
    id: string,
    beneficiaryId: string,
    medicId: string,
    specialtyId: string,
    startDate: number | string,
    endDate: number | string,
    comment: string
}