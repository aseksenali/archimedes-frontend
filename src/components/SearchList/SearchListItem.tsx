import React from 'react'
import Checkbox from '../Checkbox'
import { SearchListItemProps } from './types'
import styles from './SearchListItem.module.scss'

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

    return (
        <div className={ styles.wrapper } onClick={ onClick }>
            { props.multipleSelect ? <Checkbox label={ props.value } checked={ props.isSelected }/> : props.value }
        </div>
    )
}

export default SearchListItem