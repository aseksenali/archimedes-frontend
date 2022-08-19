import React, { useMemo, useRef, useState } from 'react'
import { WeekPickerDayProps, WeekPickerProps, WeekPickerWeekProps } from './types'
import * as styled from './styles'
import { WeekPickerWrapper } from './styles'
import Calendar from '../Calendar/Calendar'
import clsx from 'clsx'
import { DateInput } from '../DateRangePicker/styles'
import Dropdown from '../Dropdown/Dropdown'
import { monthNames } from '../../constants/calendarConstants'

const hash = (date: Date): number => {
    return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
}

const Day: React.FC<WeekPickerDayProps> = ({ value, selectedDate, currentMonth, onClick }) => {
    const isSelected = (date: Date): boolean => {
        return hash(selectedDate) === hash(date)
    }

    const isSelectedWeek = (date: Date): boolean => {
        const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
        day.setDate(day.getDate() - (day.getDay() + 6) % 7)
        const firstDate = new Date(day.getTime())
        day.setDate(day.getDate() + 6)
        const lastDate = new Date(day.getTime())
        return date >= firstDate && date <= lastDate
    }

    const notCurrentMonth = (date: Date): boolean => {
        return date.getMonth() !== currentMonth
    }

    return (
        <styled.Day className={ clsx({
            'selected': isSelected(value),
            'first': isSelectedWeek(value) && value.getDay() === 1,
            'last': isSelectedWeek(value) && value.getDay() === 0,
            'different_month': notCurrentMonth(value),
            'today': value.getFullYear() === new Date().getFullYear() && value.getMonth() === new Date().getMonth() && value.getDate() === new Date().getDate(),
        }) } onClick={ onClick }>
            { value.getDate() }
        </styled.Day>
    )
}

const Week: React.FC<WeekPickerWeekProps> = ({ value, selectedDate, currentMonth, onDayClick }) => {
    const isSelectedWeek = (date: Date): boolean => {
        const firstDate = value[0]
        const lastDate = value[value.length - 1]
        return date >= firstDate && date <= lastDate
    }

    return (
        <styled.Week className={ clsx({
            'selected': isSelectedWeek(selectedDate),
        }) }>
            { value.map(day => {
                return <Day key={ day.getTime() } value={ day } selectedDate={ selectedDate }
                            currentMonth={ currentMonth }
                            onClick={ onDayClick(day) }/>
            }) }
        </styled.Week>
    )
}

const WeekPicker = (props: WeekPickerProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [ startDate, endDate ] = useMemo(() => {
        const endDate = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), props.selectedDate.getDate())
        endDate.setDate(endDate.getDate() - (endDate.getDay() + 6) % 7)
        const startDate = new Date(endDate.getTime())
        endDate.setDate(endDate.getDate() + 6)
        return [ startDate, endDate ]
    }, [ props.selectedDate ])
    const [ isOpen, setOpen ] = useState(false)

    const handleMouseClick = (e: MouseEvent) => {
        const path = e.composedPath()
        if (!path.find(value => value === inputRef.current || value === dropdownRef.current)) {
            setOpen(false)
        }
    }

    const openDropdown = () => setOpen(true)

    const onClick = (date: Date) => (_: React.MouseEvent<HTMLDivElement>) => {
        props.onChange(date)
    }

    const weekString = useMemo(() => {
        if (startDate.getFullYear() === endDate.getFullYear()) {
            if (startDate.getDate() < endDate.getDate()) {
                return `${ startDate.getDate() } - ${ endDate.getDate() } ${ monthNames[props.selectedDate.getMonth()] } ${ props.selectedDate.getFullYear() }г.`
            } else {
                return `${ startDate.getDate() } ${ monthNames[startDate.getMonth()].substring(0, 3) }. - ${ endDate.getDate() } ${ monthNames[endDate.getMonth()].substring(0, 3) }. ${ props.selectedDate.getFullYear() }г.`
            }
        } else {
            return `${ startDate.getDate() } ${ monthNames[startDate.getMonth()].substring(0, 3) }. ${ startDate.getFullYear() % 100 }г. - ${ endDate.getDate() } ${ monthNames[endDate.getMonth()].substring(0, 3) }. ${ endDate.getFullYear() % 100 }г.`
        }
    }, [ endDate, props.selectedDate, startDate ])

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
export { Week }