import { MedicData } from '../../interfaces/MedicData'

export type MedicNameHeaderProps = {
    onBackClick: () => void
    onEditClick: () => void
    medic: MedicData | undefined
}
