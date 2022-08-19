import React, { useState } from 'react'
import { CalendarProps } from './types'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'

const Calendar = (props: CalendarProps) => {
    const [ month, setMonth ] = useState(new Date().getMonth())
    const [ year, setYear ] = useState(new Date().getFullYear())

    return (
        <>
            <CalendarHeader month={ month } year={ year }
                            setMonth={ setMonth } setYear={ setYear }/>
            <CalendarBody month={ month } year={ year } { ...props } />
        </>
    )
}

export default Calendar