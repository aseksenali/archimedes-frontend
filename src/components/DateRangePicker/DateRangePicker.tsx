import React, { useEffect, useRef, useState } from 'react'
import { DateRangeDayProps, DateRangePickerProps } from './types'
import * as styled from './styles'
import { DateInput, DateRangePickerWrapper } from './styles'
import Calendar from '../Calendar/Calendar'
import clsx from 'clsx'
import Dropdown from '../Dropdown/Dropdown'
import { DateTime, Interval } from 'luxon'

const Day = ({ day, startDate, endDate, currentMonth, onClick }: DateRangeDayProps) => {
    const isSelected = (date: DateTime): boolean => {
        return !!(endDate) && Interval.fromDateTimes(startDate, endDate).contains(date)
    }

    const notCurrentMonth = (date: DateTime): boolean => {
        return date.month !== currentMonth
    }

    return (
        <styled.Day className={ clsx({
            'selected': isSelected(day),
            'selection_border': +startDate === +day || (endDate && +endDate === +day),
            'different_month': notCurrentMonth(day),
        }) } onClick={ onClick }>
            { day.day }
        </styled.Day>
    )
}

const DateRangePicker = (props: DateRangePickerProps) => {
    const startInputRef = useRef<HTMLInputElement>(null)
    const endInputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [ startDate, setStartDate ] = useState(props.initialValue)
    const [ endDate, setEndDate ] = useState<DateTime | undefined>(startDate.plus({ week: 1 }))
    const [ isOpen, setOpen ] = useState(false)

    const handleMouseClick = (e: MouseEvent) => {
        const path = e.composedPath()
        if (!path.find(value => value === startInputRef.current || value === endInputRef.current || value === dropdownRef.current)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleMouseClick)
        return () => {
            document.removeEventListener('click', handleMouseClick)
        }
    }, [])

    const openDropdown = () => setOpen(true)

    const onClick = (date: DateTime) => (_: React.MouseEvent<HTMLDivElement>) => {
        if (endDate) {
            setStartDate(date)
            setEndDate(undefined)
        } else {
            if (date < startDate) {
                setEndDate(startDate)
                setStartDate(date)
            } else {
                setEndDate(date)
            }
        }
    }

    return (
        <DateRangePickerWrapper>
            <DateInput onClick={ openDropdown }
                       ref={ startInputRef }>
                { startDate.toLocaleString() }
            </DateInput>
            <DateInput onClick={ openDropdown }
                       ref={ endInputRef }>
                { endDate ? endDate.toLocaleString() : '' }
            </DateInput>
            <Dropdown isOpen={ isOpen } closeDropdown={ () => setOpen(false) } handleMouseClick={ handleMouseClick }
                      ref={ dropdownRef } style={ { backgroundColor: '#00607c', width: 'content-box' } }>
                <Calendar setStartDate={ setStartDate } setEndDate={ setEndDate }
                          startDate={ startDate } endDate={ endDate }
                          onClick={ onClick } type={ 'dateRange' }/>
            </Dropdown>
        </DateRangePickerWrapper>
    )
}

export default DateRangePicker
export { Day }