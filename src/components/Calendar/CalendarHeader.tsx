import { CalendarSelectorHeaderProps } from './types'
import React from 'react'
import * as styled from './styles'
import { monthNames } from '../../constants/calendarConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const CalendarHeader = ({ month, year, setMonth, setYear }: CalendarSelectorHeaderProps) => {
    const onPrevMonthClick = () => {
        if (month - 1 < 0) {
            setMonth(11)
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }
    const onNextMonthClick = () => {
        if (month + 1 > 11) {
            setMonth(0)
            setYear(year + 1)
        } else {
            setMonth(month + 1)
        }
    }

    const onPrevYearClick = () => {
        setYear(year - 1)
    }

    const onNextYearClick = () => {
        setYear(year + 1)
    }

    return (
        <styled.HeaderWrapper>
            <styled.MonthWrapper>
                <styled.NavigationButton onClick={ onPrevMonthClick }>
                    <FontAwesomeIcon icon={ faAngleLeft }/>
                </styled.NavigationButton>
                <span>{ monthNames[month].substring(0, 1).toUpperCase() + monthNames[month].substring(1) }</span>
                <styled.NavigationButton onClick={ onNextMonthClick }>
                    <FontAwesomeIcon icon={ faAngleRight }/>
                </styled.NavigationButton>
            </styled.MonthWrapper>
            <styled.YearWrapper>
                <styled.NavigationButton onClick={ onPrevYearClick }>
                    <FontAwesomeIcon icon={ faAngleLeft }/>
                </styled.NavigationButton>
                <span>{ year }</span>
                <styled.NavigationButton onClick={ onNextYearClick }>
                    <FontAwesomeIcon icon={ faAngleRight }/>
                </styled.NavigationButton>
            </styled.YearWrapper>
        </styled.HeaderWrapper>
    )
}

export default CalendarHeader