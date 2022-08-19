import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { MenuElementProps } from './types'
import clsx from 'clsx'

type IconWithTextProps = {
    gap: number
    icon: IconDefinition
    text: string
}

const IconWithTextWrapper = styled.div<{ gap: number }>`
  display: grid;
  grid-template-columns: 30px auto;
  column-gap: ${ props => `${ props.gap }px` };
  flex-direction: row;
`

const MenuElementWrapper = styled.div`
  padding: 1em 1em;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 1px solid #aaa;
  color: var(--primary-color);

  &.selected {
    background-color: #00607c;
    color: white;
  }

  &:hover:not(.selected) {
    background-color: #EDF5F8;
  }
`

const IconWithText = (props: IconWithTextProps) => {
    return (
        <IconWithTextWrapper gap={ props.gap }>
            <FontAwesomeIcon icon={ props.icon } size={ 'lg' }/>
            <span>{ props.text }</span>
        </IconWithTextWrapper>
    )
}

const MenuElement = (props: MenuElementProps) => {
    return (
        <MenuElementWrapper onClick={ props.onSelectionChanged } className={ clsx({ 'selected': props.selected }) }>
            <IconWithText gap={ 10 } text={ props.text } icon={ props.icon }/>
        </MenuElementWrapper>
    )
}

export default MenuElement