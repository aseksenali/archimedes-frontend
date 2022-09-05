import React, { useMemo, useRef, useState } from 'react'
import { TextFilterProps } from './types'
import Dropdown from '../Dropdown'
import SearchList from '../SearchList'
import styled from './TextFilter.module.scss'
import { Icon } from '../icons'

const TextFilter = (props: TextFilterProps) => {
    const { inputRef } = props
    const [ isOpen, setOpen ] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleMouseClick = (e: MouseEvent) => {
        const path = e.composedPath()
        if (!path.find(value => value === inputRef.current || value === dropdownRef.current)) {
            setOpen(false)
        }
    }

    const openDropdown = () => {
        setOpen(true)
    }

    const inputValue = useMemo(() => {
        const getEnding = (value: number) => {
            if (value % 10 === 1 && value !== 11) return 'е'
            if ((value % 10 === 2 || value % 10 === 3 || value % 10 === 4) && value !== 12 && value !== 13 && value !== 14) return 'я'
            else return 'й'
        }
        if (props.multipleSelect) {
            if (props.value.length === 0) return ''
            if (props.value.length === 1) return props.value[0]
            else return `${ props.value.length > 1 ? `${ props.value.length } значени${ getEnding(props.value.length) }` : '' }`
        } else {
            return props.value
        }
    }, [ props.multipleSelect, props.value ])

    return (
        <div className={ styled.wrapper } style={ { width: `${ props.width }%` } }>
            <label>{ props.label }</label>
            <div className={ styled.input_wrapper }>
                <input className={ styled.text } type={ 'text' }
                       onClick={ () => isOpen ? setOpen(false) : openDropdown() }
                       value={ inputValue ? inputValue : '' } ref={ inputRef }
                       placeholder={ props.placeholder } readOnly/>
                <Icon icon={ 'arrowLeft' } className={ styled.arrow_icon } style={ {
                    transform: isOpen ? 'rotateZ(90deg)' : 'rotateZ(-90deg)',
                    top: isOpen ? '.2em' : '.25em',
                } }/>
            </div>
            <Dropdown isOpen={ isOpen } closeDropdown={ () => setOpen(false) } handleMouseClick={ handleMouseClick }
                      ref={ dropdownRef } style={ {
                backgroundColor: 'var(--primary-color)',
                width: '100%',
                border: '1px solid var(--primary-color)',
                padding: '.5em',
            } }>
                { props.multipleSelect ?
                    <SearchList items={ props.possibleItems } multipleSelect={ props.multipleSelect }
                                selectedItems={ props.value }
                                onItemSelect={ props.onAddElement } onItemDeselect={ props.onRemoveElement }/>
                    : <SearchList items={ props.possibleItems } multipleSelect={ props.multipleSelect }
                                  onItemClick={ props.onChange } closeDropdown={ () => setOpen(false) }/>
                }
            </Dropdown>
        </div>
    )
}

export default TextFilter