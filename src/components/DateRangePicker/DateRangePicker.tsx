import React, { useEffect, useRef, useState } from 'react'
import { DateRangeDayProps, DateRangePickerProps } from './types'
import * as styled from './styles'
import { DateInput, DateRangePickerWrapper } from './styles'
import Calendar from '../Calendar/Calendar'
import clsx from 'clsx'
import Dropdown from '../Dropdown/Dropdown'

const hash = (date: Date): number => {
    return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
}

const Day: React.FC<DateRangeDayProps> = ({ value, startDate, endDate, currentMonth, onClick }) => {
    const isSelected = (date: Date): boolean => {
        return !!(endDate) && hash(date) >= hash(startDate) &&
            hash(date) <= hash(endDate)
    }
    const isStart = (date: Date): boolean => {
        return hash(date) === hash(startDate)
    }

    const isEnd = (date: Date): boolean => {
        return !!(endDate) && hash(date) === hash(endDate)
    }

    const notCurrentMonth = (date: Date): boolean => {
        return date.getMonth() !== currentMonth
    }

    return (
        <styled.Day className={ clsx({
            'selected': isSelected(value),
            'selection_border': isStart(value) || isEnd(value),
            'different_month': notCurrentMonth(value),
        }) } onClick={ onClick }>
            { value.getDate() }
        </styled.Day>
    )
}

const DateRangePicker = (props: DateRangePickerProps) => {
    const startInputRef = useRef<HTMLInputElement>(null)
    const endInputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [ startDate, setStartDate ] = useState(props.initialValue)
    const weekLater = new Date(props.initialValue.getTime())
    weekLater.setDate(weekLater.getDate() + 6)
    const [ endDate, setEndDate ] = useState<Date | undefined>(weekLater)
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

    const onClick = (date: Date) => (_: React.MouseEvent<HTMLDivElement>) => {
        if (endDate) {
            setStartDate(date)
            setEndDate(undefined)
        } else {
            if (hash(date) < hash(startDate)) {
                setEndDate(new Date(startDate.getTime()))
                setStartDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
            } else {
                setEndDate(date)
            }
        }
    }

    return (
        <DateRangePickerWrapper>
            <DateInput onClick={ openDropdown }
                       ref={ startInputRef }>
                { startDate.toLocaleDateString() }
            </DateInput>
            <DateInput onClick={ openDropdown }
                       ref={ endInputRef }>
                { endDate ? endDate.toLocaleDateString() : '' }
            </DateInput>
            <Dropdown isOpen={ isOpen } closeDropdown={ () => setOpen(false) } handleMouseClick={ handleMouseClick }
                      ref={ dropdownRef } style={ { backgroundColor: '#00607c', width: 'content-box' } }>
                <Calendar setStartDate={ setStartDate } setEndDate={ setEndDate }
                          startDate={ startDate } endDate={ endDate }
                          onClick={ onClick } type={ 'daterange' }/>
            </Dropdown>
        </DateRangePickerWrapper>
    )
}

export default DateRangePicker
export { Day }