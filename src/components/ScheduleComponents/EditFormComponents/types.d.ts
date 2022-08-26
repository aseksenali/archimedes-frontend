import { MutableRefObject } from 'react'
import { BeneficiaryData } from '../../../redux/reducers/beneficiaryApi'

export type TextDropdownInputProps = {
    placeholder: string
    possibleItems: Array<BeneficiaryData>
    inputRef: MutableRefObject<HTMLInputElement | null>
    value: BeneficiaryData
    onChange: (value: BeneficiaryData) => void
}

export type SearchListProps = {
    items: Array<BeneficiaryData>
    onItemClick: (item: BeneficiaryData) => void
    closeDropdown: () => void
}

export type SearchListItemProps = {
    value: BeneficiaryData
    onItemClick: (item: BeneficiaryData) => void
    closeDropdown: () => void
}
