export type SearchListProps = {
    items: string[]
} & ({
    multipleSelect: true
    selectedItems: Array<string>
    onItemSelect: (item: string) => void
    onItemDeselect: (item: string) => void
} | {
    multipleSelect: false
    selectedItems?: never
    onItemClick: (item: string) => void
    closeDropdown: () => void
})

export type SearchListItemProps = {
    value: string
} & ({
    multipleSelect: true
    isSelected: boolean
    onItemSelect: (item: string) => void
    onItemDeselect: (item: string) => void
} | {
    multipleSelect: false
    onItemClick: (item: string) => void
    closeDropdown: () => void
})
