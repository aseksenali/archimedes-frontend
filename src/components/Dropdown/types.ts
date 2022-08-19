import { CSSProperties, ReactNode } from 'react'

export type DropdownProps = {
    isOpen: boolean
    closeDropdown: () => void
    handleMouseClick: (e: MouseEvent) => void
    children?: ReactNode
    style: CSSProperties
}