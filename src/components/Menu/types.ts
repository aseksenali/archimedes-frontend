import { NavigationData } from '../../pages/MainPage/types'
import { SVGProps, VFC } from 'react'

export type MenuElementProps = {
    text: string
    icon: VFC<SVGProps<SVGSVGElement>>
    onSelectionChanged: () => void
    selected: boolean
}

export type MenuProps = {
    items: Array<NavigationData>,
    width: number,
    onSelectionChanged: (value: NavigationData) => void
}