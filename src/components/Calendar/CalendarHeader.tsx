import { CalendarSelectorHeaderProps } from './types'
import React from 'react'
import '../../helpers/stringHelper'
import { Icon } from '../icons'
import styles from './CalendarHeader.module.scss'

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
        <div className={ styles.wrapper }>
            <div className={ styles.month }>
                <button className={ styles.navigation_button } onClick={ onPrevMonthClick }>
                    <Icon icon={ 'arrowLeft' }
                          style={ { width: '1em', height: '1em', position: 'relative', top: '.2em', fill: 'white' } }/>
                </button>
                <span>{ monthAndYear.toFormat('LLLL').capitalize() }</span>
                <button className={ styles.navigation_button } onClick={ onNextMonthClick }>
                    <Icon icon={ 'arrowLeft' } style={ {
                        width: '1em',
                        height: '1em',
                        position: 'relative',
                        top: '.2em',
                        fill: 'white',
                        transform: 'rotateZ(180deg)',
                    } }/>
                </button>
            </div>
            <div className={ styles.year }>
                <button className={ styles.navigation_button } onClick={ onPrevYearClick }>
                    <Icon icon={ 'arrowLeft' }
                          style={ { width: '1em', height: '1em', position: 'relative', top: '.2em', fill: 'white' } }/>
                </button>
                <span>{ monthAndYear.toFormat('yyyy') }</span>
                <button className={ styles.navigation_button } onClick={ onNextYearClick }>
                    <Icon icon={ 'arrowLeft' } style={ {
                        width: '1em',
                        height: '1em',
                        position: 'relative',
                        top: '.2em',
                        fill: 'white',
                        transform: 'rotateZ(180deg)',
                    } }/>
                </button>
            </div>
        </div>
    )
}

export default CalendarHeader