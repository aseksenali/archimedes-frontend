import { CalendarSelectorHeaderProps } from './types'
import React from 'react'
import * as styled from './styles'
import { ReactComponent as AngleDown } from '../../assets/icons/arrowLeft.svg'

const capitalize = (str: string): string => str.substring(0, 1).toUpperCase().concat(str.substring(1).toLowerCase())

const CalendarHeader = ({ monthAndYear, setMonthAndYear }: CalendarSelectorHeaderProps) => {
    const onPrevMonthClick = () =>
        setMonthAndYear(monthAndYear.minus({ month: 1 }))

    const onNextMonthClick = () =>
        setMonthAndYear(monthAndYear.plus({ month: 1 }))

    const onPrevYearClick = () =>
        setMonthAndYear(monthAndYear.minus({ year: 1 }))

    const onNextYearClick = () =>
        setMonthAndYear(monthAndYear.plus({ year: 1 }))

    return (
        <styled.HeaderWrapper>
            <styled.MonthWrapper>
                <styled.NavigationButton onClick={ onPrevMonthClick }>
                    <AngleDown
                        style={ { width: '1em', height: '1em', position: 'relative', top: '.2em', fill: 'white' } }/>
                </styled.NavigationButton>
                <span>{ capitalize(monthAndYear.toFormat('LLLL')) }</span>
                <styled.NavigationButton onClick={ onNextMonthClick }>
                    <AngleDown style={ {
                        width: '1em',
                        height: '1em',
                        position: 'relative',
                        top: '.2em',
                        fill: 'white',
                        transform: 'rotateZ(180deg)',
                    } }/>
                </styled.NavigationButton>
            </styled.MonthWrapper>
            <styled.YearWrapper>
                <styled.NavigationButton onClick={ onPrevYearClick }>
                    <AngleDown
                        style={ { width: '1em', height: '1em', position: 'relative', top: '.2em', fill: 'white' } }/>
                </styled.NavigationButton>
                <span>{ monthAndYear.toFormat('yyyy') }</span>
                <styled.NavigationButton onClick={ onNextYearClick }>
                    <AngleDown style={ {
                        width: '1em',
                        height: '1em',
                        position: 'relative',
                        top: '.2em',
                        fill: 'white',
                        transform: 'rotateZ(180deg)',
                    } }/>
                </styled.NavigationButton>
            </styled.YearWrapper>
        </styled.HeaderWrapper>
    )
}

export default CalendarHeader