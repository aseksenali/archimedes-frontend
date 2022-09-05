import React, { useRef, useState } from 'react'
import { LabeledInputProps } from './types'
import * as styled from './styles'
import Dropdown from '../Dropdown'
import SearchList from '../SearchList'

const LabeledInput = (props: LabeledInputProps) => {
    const [ isOpen, setOpen ] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const onChange = (value: string) => {
        if (inputRef.current) props.onInputChange(value)
    }
    const handleMouseClick = (e: MouseEvent) => {
        const path = e.composedPath()
        if (!path.find(value => value === inputRef.current || value === dropdownRef.current)) {
            setOpen(false)
        }
    }
    if (props.inputType === 'select') {
        const openDropdown = () => {
            setOpen(true)
        }
        return (
            <styled.LabeledInputWrapper>
                <styled.StyledLabel>{ props.label }</styled.StyledLabel>
                <styled.TextInputWrapper>
                    <styled.StyledInput type={ 'text' }
                                        onClick={ () => isOpen ? setOpen(false) : openDropdown() }
                                        value={ props.inputValue ? props.inputValue : '' }
                                        ref={ inputRef }
                                        width={ '100%' }
                                        placeholder={ props.inputPlaceholder }
                                        cursor={ 'pointer' } readOnly/>
                    <styled.StyledIcon icon={ 'arrowLeft' } open={ isOpen }/>
                </styled.TextInputWrapper>
                {
                    isOpen && <Dropdown isOpen={ isOpen } closeDropdown={ () => setOpen(false) }
                                        handleMouseClick={ handleMouseClick }
                                        ref={ dropdownRef } style={ {
                        backgroundColor: 'var(--primary-color)',
                        width: 'calc(100% - 180px)',
                        border: '1px solid var(--primary-color)',
                        padding: '.5em',
                        left: '180px',
                    } }>
                        <SearchList items={ props.selectOptions } multipleSelect={ false }
                                    onItemClick={ onChange } closeDropdown={ () => setOpen(false) }/>
                    </Dropdown>
                }
            </styled.LabeledInputWrapper>
        )
    }
    return (
        <styled.LabeledInputWrapper>
            <styled.StyledLabel>{ props.label }</styled.StyledLabel>
            <div style={ { display: 'inline-block', width: 'calc(100% - 180px)' } }>
                { !!props.inputMask &&
                    <styled.StyledInputMask onChange={ e => props.onInputChange(e.target.value) }
                                            value={ props.inputValue } mask={ props.inputMask }
                                            placeholder={ props.inputPlaceholder }/> }
                { !props.inputMask && props.inputType === 'text' &&
                    <styled.StyledInput type={ 'text' } onChange={ e => props.onInputChange(e.target.value) }
                                        value={ props.inputValue }
                                        width={ props.inputWidth } cursor={ 'text' }
                                        placeholder={ props.inputPlaceholder }/> }
            </div>
        </styled.LabeledInputWrapper>
    )
}

export default LabeledInput