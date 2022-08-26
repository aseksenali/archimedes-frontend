import React from 'react'
import { MenuProps } from './types'
import { MenuWrapper } from './styles'
import MenuElement from './MenuElement'
import { useLocation } from 'react-router'

const Menu = (props: MenuProps) => {
    const location = useLocation()

    return (
        <MenuWrapper openWidth={ props.width }>
            {
                props.items.map(item => <MenuElement onSelectionChanged={ () => props.onSelectionChanged(item) }
                                                     key={ item.text }
                                                     selected={ location.pathname.startsWith(item.path) } { ...item }/>)
            }
        </MenuWrapper>
    )
}

export default Menu