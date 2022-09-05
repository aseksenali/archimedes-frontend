import { NavigationData } from '../NavigationMenu/types'

export type MenuElementProps = {
    text: string
    icon: string
    selected: boolean
    onClick?: () => void
    href?: string
}

export type MenuProps = {
    items: Array<NavigationData>,
}

export type IconWithTextProps = {
    icon: string
    text: string
    className: string
}