import { MutableRefObject } from 'react'

export type TextFilterProps = {
    label: string
    placeholder: string
    possibleItems: Array<string>
    width: number
    inputRef: MutableRefObject<HTMLInputElement | null>
} & ({
    multipleSelect: false
    value: string
    onChange: (value: string) => void
} | {
    multipleSelect: true
    value: Array<string>
    onAddElement: (value: string) => void
    onRemoveElement: (value: string) => void
})