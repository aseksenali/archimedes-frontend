export type LabeledInputProps = {
    label: string
    inputValue: string
    inputWidth: string
    inputPlaceholder: string
    onInputChange: (value: string) => void
    inputMask?: string
} & ({
    inputType: 'select'
    selectOptions: Array<string>
} | {
    inputType: 'text'
} | {
    inputType: 'date'
})
