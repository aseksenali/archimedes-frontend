import { SVGProps, VFC } from 'react'

interface NavigationData {
    text: string
    icon: VFC<SVGProps<SVGSVGElement>>
    path: string
}

export type { NavigationData }