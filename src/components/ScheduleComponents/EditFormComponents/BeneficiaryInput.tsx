import React, { useRef, useState } from 'react'
import { TextDropdownInputProps } from './types'
import * as styled from './styles'
import Dropdown from '../../Dropdown/Dropdown'
import SearchList from './SearchList'

const BeneficiaryInput = (props: TextDropdownInputProps) => {
    const [ isOpen, setOpen ] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleMouseClick = (e: MouseEvent) => {
        const path = e.composedPath()
        if (!path.find(value => value === props.inputRef.current || value === dropdownRef.current)) {
            setOpen(false)
        }
    }

    const openDropdown = () => {
        setOpen(true)
    }

    return (
        <>
            <styled.TextFilterWrapper>
                <styled.TextInputWrapper>
                    <styled.TextInput type={ 'text' }
                                      onClick={ () => isOpen ? setOpen(false) : openDropdown() }
                                      value={ props.value ? props.value.beneficiaryId : '' } ref={ props.inputRef }
                                      placeholder={ props.placeholder } readOnly/>
                    <styled.Icon open={ isOpen }/>
                </styled.TextInputWrapper>
                <Dropdown isOpen={ isOpen } closeDropdown={ () => setOpen(false) } handleMouseClick={ handleMouseClick }
                          ref={ dropdownRef } style={ {
                    backgroundColor: 'var(--primary-color)',
                    width: '100%',
                    border: '1px solid var(--primary-color)',
                    padding: '.5em',
                } }>
                    <SearchList items={ props.possibleItems }
                                onItemClick={ props.onChange } closeDropdown={ () => setOpen(false) }/>
                </Dropdown>
            </styled.TextFilterWrapper>
            <styled.TextInput type={ 'text' } value={ props.value ? props.value.fullName : '' } readOnly/>
        </>
    )
}

export default BeneficiaryInput