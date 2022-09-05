import React, { forwardRef } from 'react'
import styles from './MenuElement.module.scss'
import { IconWithTextProps, MenuElementProps } from './types'
import clsx from 'clsx'
import { Icon } from '../icons'

const IconWithText = ({ icon, ...props }: IconWithTextProps) => {
    return (
        <div className={ clsx(styles.icon_with_text, styles.wrapper, props.className) }>
            <Icon icon={ icon } style={ {
                width: '1.3em',
                height: '1.3em',
            } }/>
            <span>{ props.text }</span>
        </div>
    )
}

const MenuElement = forwardRef((props: MenuElementProps, ref) => {
    return (
        <a href={ props.href } onClick={ props.onClick } style={ { textDecoration: 'none' } }>
            <IconWithText className={ clsx({ [styles.selected]: props.selected }) } text={ props.text }
                          icon={ props.icon }/>
        </a>
    )
})

export default MenuElement