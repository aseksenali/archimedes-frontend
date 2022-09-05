import React, { useState } from 'react'
import { CalendarProps } from './types'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import { DateTime } from 'luxon'

const Calendar = (props: CalendarProps) => {
    const [ monthAndYear, setMonthAndYear ] = useState(DateTime.utc().startOf('month').setLocale('ru'))

    return (
        <>
            <CalendarHeader monthAndYear={ monthAndYear } setMonthAndYear={ setMonthAndYear }/>
            <CalendarBody monthAndYear={ monthAndYear } { ...props } />
        </>
    )
}

export default Calendar