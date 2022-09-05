import React, { useMemo, useRef, useState } from 'react'
import { WeekPickerProps } from './types'
import { WeekPickerWrapper } from './styles'
import Calendar from '../Calendar'
import { DateInput } from '../DateRangePicker/styles'
import Dropdown from '../Dropdown'
import { DateTime, Interval } from 'luxon'

const WeekPicker = (props: WeekPickerProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const interval = useMemo(() =>
            Interval.fromDateTimes(props.selectedDate.startOf('week'), props.selectedDate.endOf('week')),
        [ props.selectedDate ])
    const [ isOpen, setOpen ] = useState(false)

    const handleMouseClick = (e: MouseEvent) => {
        const path = e.composedPath()
        if (!path.find(value => value === inputRef.current || value === dropdownRef.current)) {
            setOpen(false)
        }
    }

    const openDropdown = () => setOpen(true)

    const onClick = (date: DateTime) => (_: React.MouseEvent<HTMLDivElement>) => {
        props.onChange(date)
    }

    const weekString = useMemo(() => {
        return interval.toLocaleString('ru')
    }, [ interval ])

    return (
        <WeekPickerWrapper>
            <span>
                Период:
                <DateInput onClick={ openDropdown }
                           ref={ inputRef }>
                    { weekString }
                </DateInput>
            </span>
            <Dropdown isOpen={ isOpen } closeDropdown={ () => setOpen(false) } handleMouseClick={ handleMouseClick }
                      ref={ dropdownRef }
                      style={ { backgroundColor: '#00607c', width: 'content-box' } }>
                <Calendar type={ 'week' } selectedDate={ props.selectedDate }
                          onClick={ onClick }/>
            </Dropdown>
        </WeekPickerWrapper>
    )
}

export default WeekPicker