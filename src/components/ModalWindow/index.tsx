import React, { PropsWithChildren, useRef } from 'react'
import { ModalWindowProps } from './types'
import * as styled from './styles'

const ModalWindow = (props: PropsWithChildren<ModalWindowProps>) => {
    const backgroundRef = useRef<HTMLDivElement>(null)
    if (!props.isOpen) return null

    return (
        <styled.Background onClick={ (e: React.MouseEvent) => {
            if (e.target === backgroundRef.current)
                props.onClose()
        } } ref={ backgroundRef }>
            <styled.ContentBox>
                { props.children }
            </styled.ContentBox>
        </styled.Background>
    )
}

export default ModalWindow