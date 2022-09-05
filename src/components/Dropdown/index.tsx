import React, { ForwardedRef, forwardRef, useEffect } from 'react'
import { DropdownProps } from './types'
import styles from './Dropdown.module.scss'

const Dropdown = forwardRef((props: DropdownProps, ref: ForwardedRef<HTMLDivElement>) => {
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                props.closeDropdown()
            }
        }, false)
        document.body.addEventListener('click', (e) => {
            props.handleMouseClick(e)
        })
        return () => {
            document.body.removeEventListener('click', props.handleMouseClick)
        }
    }, [ props, ref ])

    return (
        <div style={ { position: 'relative', width: '100%' } }>
            { props.isOpen &&
                <div className={ styles.dropdown } ref={ ref } { ...props }>
                    { props.children }
                </div> }
        </div>
    )
})

export default Dropdown