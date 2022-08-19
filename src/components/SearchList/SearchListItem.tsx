import React from 'react'
import styled from 'styled-components'
import Checkbox from '../Checkbox/Checkbox'
import { SVG } from '../Checkbox/styles'

type SearchListItemProps = {
    value: string
} & ({
    multipleSelect: true
    isSelected: boolean
    onItemSelect: (item: string) => void
    onItemDeselect: (item: string) => void
} | {
    multipleSelect: false
    onItemClick: (item: string) => void
    closeDropdown: () => void
})

const SearchListItemWrapper = styled.div`
  &:not(:last-of-type) {
    border-bottom: 1px solid white;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: .3em .5em;
  cursor: pointer;

  &:hover {
    background-color: #0f86a8;

    & ${ SVG } {
      stroke: #0f86a8 !important;
    }
  }

  user-select: none;
`

const SearchListItem = (props: SearchListItemProps) => {
    const onClick = () => {
        if (props.multipleSelect) {
            if (props.isSelected) props.onItemDeselect(props.value)
            else props.onItemSelect(props.value)
        } else {
            props.onItemClick(props.value)
            props.closeDropdown()
        }
    }

    if (props.multipleSelect)
        return (
            <SearchListItemWrapper onClick={ onClick }>
                <Checkbox label={ props.value } checked={ props.isSelected }/>
            </SearchListItemWrapper>
        )
    else
        return (
            <SearchListItemWrapper onClick={ onClick }>
                { props.value }
            </SearchListItemWrapper>
        )
}

export default SearchListItem