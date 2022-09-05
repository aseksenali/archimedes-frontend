import { DateTime } from 'luxon'

export type MedicData = {
    medicId: string
    medicIIN: string
    medicName: string
    isMale: boolean
    isResident: boolean
    documentType: string
    documentNumber: string
    homePhoneNumber: string
    workPhoneNumber: string
    mobilePhoneNumber: string
    address: string
    email: string
    typeOfWork: string
    dateOfBirth: DateTime
    medicPosition: string
    specialties: Array<string>
    branch: string
    startDate: DateTime
    endDate?: DateTime
}