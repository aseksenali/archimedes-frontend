import React from 'react'
import { SearchListItemProps } from './types'
import * as styled from './styles'

const SearchListItem = (props: SearchListItemProps) => {
    const onClick = () => {
        props.onItemClick(props.value)
        props.closeDropdown()
    }
    return (
        <styled.SearchListItemWrapper onClick={ onClick }>
            { props.value.beneficiaryId }
        </styled.SearchListItemWrapper>
    )
}

export default SearchListItem