import React from 'react'
import { MenuProps } from './types'
import styles from './Menu.module.scss'
import MenuElement from './MenuElement'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Menu = (props: MenuProps) => {
    const router = useRouter()
    const location = router.pathname

    return (
        <div className={ styles.wrapper }>
            {
                props.items.map(item => (
                    <Link key={ item.text } href={ item.path } passHref>
                        <MenuElement selected={ location.startsWith(item.path) } { ...item }/>
                    </Link>
                ))
            }
        </div>
    )
}

export default Menu