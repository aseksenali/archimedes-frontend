import React from 'react'
import styled from 'styled-components'
import { alpha, createTheme } from '@mui/material'
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    CurrentTimeIndicator,
    Scheduler,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler'
import ScheduleDetailsProps from './types'
import { useOutletContext } from 'react-router'
import { ScheduleOutletContext } from '../types'
import TimeTableCellProps = WeekView.TimeTableCellProps
import DayScaleCellProps = WeekView.DayScaleCellProps

const theme = createTheme({
    palette: {
        primary: {
            main: '#0000ff',
        },
        action: {
            disabledBackground: '#333',
        },
    },
})

const RootComponent = (props: Scheduler.RootProps) => {
    return (
        <Scheduler.Root { ...props } style={ { height: '80.9%' } }/>
    )
}

const appointments: Array<AppointmentModel> = [ {
    startDate: '2022-08-13T10:00',
    endDate: '2022-08-13T11:15',
    title: 'Meeting',
    type: 'private',
}, {
    startDate: '2018-10-31T07:30',
    endDate: '2018-10-31T09:00',
    title: 'Go to a gym',
    type: 'work',
} ]

const PREFIX = 'Demo'

const classes = {
    todayCell: `${ PREFIX }-todayCell`,
    weekendCell: `${ PREFIX }-weekendCell`,
    today: `${ PREFIX }-today`,
    weekend: `${ PREFIX }-weekend`,
}

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(() => ({
    [`&.${ classes.todayCell }`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
    },
    [`&.${ classes.weekendCell }`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
    },
}))

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(() => ({
    [`&.${ classes.today }`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    [`&.${ classes.weekend }`]: {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
    },
}))

const TimeTableCell = (props: TimeTableCellProps) => {
    const { startDate } = props
    const date = new Date(startDate!!)

    if (date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
        return <StyledWeekViewTimeTableCell { ...props } className={ classes.todayCell }/>
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
        return <StyledWeekViewTimeTableCell { ...props } className={ classes.weekendCell }/>
    }
    return <StyledWeekViewTimeTableCell { ...props } />
}

const DayScaleCell = (props: DayScaleCellProps) => {
    const { startDate, today } = props

    if (today) {
        return <StyledWeekViewDayScaleCell { ...props } className={ classes.today }/>
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        return <StyledWeekViewDayScaleCell { ...props } className={ classes.weekend }/>
    }
    return <StyledWeekViewDayScaleCell { ...props } />
}

const ScheduleDetails = (_: ScheduleDetailsProps) => {
    const { date } = useOutletContext<ScheduleOutletContext>()

    return (
        <Scheduler
            rootComponent={ RootComponent }
            data={ appointments }
            locale={ 'ru-RU' }
            firstDayOfWeek={ 1 }
        >
            <ViewState
                currentDate={ date }
            />
            <WeekView
                startDayHour={ 0 }
                endDayHour={ 24 }
                timeTableCellComponent={ TimeTableCell }
                dayScaleCellComponent={ DayScaleCell }
            />
            <Appointments/>
            <AppointmentTooltip
                showCloseButton
                showOpenButton
            />
            <AppointmentForm/>
            <CurrentTimeIndicator
                shadePreviousCells={ true }
                shadePreviousAppointments={ true }
                updateInterval={ 10000 }
            />
        </Scheduler>
    )
}

export default ScheduleDetails