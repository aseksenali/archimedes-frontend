import { MedicData } from '../../interfaces/MedicData'

export type MedicInfoModalWindowProps = {
    isOpen: boolean
    onClose: () => void
    medic: MedicData | undefined
    onSave: (formData: Partial<MedicData>) => void
}

export type MedicInfoFormData =
    Omit<MedicData, 'dateOfBirth' | 'startDate' | 'endDate'>
    & { dateOfBirth: string, startDate: string, endDate?: string }
