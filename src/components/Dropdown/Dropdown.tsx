import React, { ForwardedRef, forwardRef, useEffect } from 'react'
import { DropdownProps } from './types'
import { DropdownWrapper } from './styles'

const Dropdown = forwardRef((props: DropdownProps, ref: ForwardedRef<HTMLDivElement>) => {
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                props.closeDropdown()
            }
        }, false)
        document.addEventListener('click', props.handleMouseClick)
        return () => {
            document.removeEventListener('click', props.handleMouseClick)
        }
    }, [])

    return (
        <div style={ { position: 'relative', width: '100%' } }>
            { props.isOpen &&
                <DropdownWrapper ref={ ref } { ...props }>
                    { props.children }
                </DropdownWrapper> }
        </div>
    )
})

export default Dropdown