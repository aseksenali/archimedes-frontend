import React, { SVGProps, VFC } from 'react'
import styled from 'styled-components'
import { MenuElementProps } from './types'
import clsx from 'clsx'

type IconWithTextProps = {
    gap: number
    icon: VFC<SVGProps<SVGSVGElement>>,
    text: string
}

const IconWithTextWrapper = styled.div<{ gap: number }>`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: ${ props => `${ props.gap }em` };
  flex-direction: row;
`

const MenuElementWrapper = styled.div`
  padding: 0 1em;
  height: 53px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 1px solid #aaa;
  color: var(--primary-color);

  &.selected {
    background-color: var(--primary-color);
    color: white;
    & svg {
      fill: white;
    }
  }
  
  &:not(.selected) {
    & svg {
      fill: var(--primary-color);
    }
    &:hover {
      background-color: #EDF5F8;
    }
  }
`

const IconWithText = ({ icon: Icon, ...props }: IconWithTextProps) => {
    return (
        <IconWithTextWrapper gap={ props.gap }>
            <Icon style={ {
                width: '1.3em',
                height: '1.3em',
            } }/>
            <span>{ props.text }</span>
        </IconWithTextWrapper>
    )
}

const MenuElement = (props: MenuElementProps) => {
    return (
        <MenuElementWrapper onClick={ props.onSelectionChanged } className={ clsx({ 'selected': props.selected }) }>
            <IconWithText gap={ 1 } text={ props.text } icon={ props.icon }/>
        </MenuElementWrapper>
    )
}

export default MenuElement