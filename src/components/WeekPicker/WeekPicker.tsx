import React, { useMemo, useRef, useState } from 'react'
import { WeekPickerDayProps, WeekPickerProps, WeekPickerWeekProps } from './types'
import * as styled from './styles'
import { WeekPickerWrapper } from './styles'
import Calendar from '../Calendar/Calendar'
import clsx from 'clsx'
import { DateInput } from '../DateRangePicker/styles'
import Dropdown from '../Dropdown/Dropdown'
import { DateTime, Interval } from 'luxon'

const Day = ({ day, selectedDate, currentMonth, onClick }: WeekPickerDayProps) => {
    return (
        <styled.Day className={ clsx({
            'selected': +day === +selectedDate,
            'first': +day === +(selectedDate.startOf('week')),
            'last': +day === +(selectedDate.endOf('week').startOf('day')),
            'different_month': day.month !== currentMonth,
            'today': +day === +DateTime.utc().startOf('day'),
        }) } onClick={ onClick }>
            { day.day }
        </styled.Day>
    )
}

const Week = ({ weekDays, selectedDate, currentMonth, onDayClick }: WeekPickerWeekProps) => {
    return (
        <styled.Week className={ clsx({
            'selected': weekDays.contains(selectedDate),
        }) }>
            { weekDays.splitBy({ day: 1 }).map(value => value.start.startOf('day')).map(day => {
                return <Day key={ day.toMillis() } day={ day } selectedDate={ selectedDate }
                            currentMonth={ currentMonth }
                            onClick={ onDayClick(day) }/>
            }) }
        </styled.Week>
    )
}

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
export { Week }