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