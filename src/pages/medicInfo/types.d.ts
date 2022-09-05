import { DateTime } from 'luxon'

export type MedicInfoRow = {
    medicId: string,
    medicIIN: string
    medicName: string
    medicPosition: string
    medicSpecialties: Array<string | undefined>
    startOfWorkDate: DateTime
    endOfWorkDate?: DateTime
}

export type FiltersList = {
    branchName: Array<string>
    specialtyName: Array<string>
    medicName: Array<string>
    medicIIN: Array<string>
}
