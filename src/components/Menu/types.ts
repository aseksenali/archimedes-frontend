import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { NavigationData } from '../../pages/MainPage/types'

export type MenuElementProps = {
    text: string
    icon: IconDefinition
    onSelectionChanged: () => void
    selected: boolean
}

export type MenuProps = {
    items: Array<NavigationData>,
    width: number,
    onSelectionChanged: (value: NavigationData) => void
}