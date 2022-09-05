import * as React from 'react'
import { useMemo } from 'react'
import classNames from 'clsx'
import Grid from '@mui/material/Grid'
import { PureComputed } from '@devexpress/dx-core'
import { FormatterFn, SchedulerDateTime } from '@devexpress/dx-react-scheduler'
import moment from 'moment'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import styled from 'styled-components'
import '../../../helpers/stringHelper'
import { Icon } from '../../icons'

const WEEKDAY_INTERVAL = 'weekdayInterval'
const LONG_WEEK_DAY_OPTIONS = { weekday: 'long' }
const EMPTY_OPTIONS = {}

const calculateTextByDays: PureComputed<[ SchedulerDateTime, SchedulerDateTime | undefined, FormatterFn, object ], string> = (startViewDate, endViewDate, formatDate, additionalOptions) => {
    const momentStartViewDate = moment(startViewDate as Date)
    const momentEndViewDate = moment(endViewDate as Date)

    if (momentStartViewDate.isSame(momentEndViewDate, 'day')) {
        return formatDate(momentStartViewDate.toDate(), {
            ...{ day: 'numeric', month: 'long', year: 'numeric' }, ...additionalOptions,
        })
    }
    if (momentStartViewDate.isSame(momentEndViewDate, 'year')) {
        if (momentStartViewDate.isSame(momentEndViewDate, 'month')) {
            return `${
                formatDate(momentStartViewDate.toDate(), { day: 'numeric' })
            }-${
                formatDate(momentEndViewDate.toDate(), { day: 'numeric' })
            } ${
                formatDate(momentEndViewDate.toDate(), { month: 'long', year: 'numeric' })
            }`
        }
        return `${
            formatDate(momentStartViewDate.toDate(), { day: 'numeric', month: 'short' })
        } - ${
            formatDate(momentEndViewDate.toDate(), {
                day: 'numeric', month: 'short', year: 'numeric',
            })
        }`
    }
    return `${
        formatDate(momentStartViewDate.toDate(), {
            day: 'numeric', month: 'short', year: '2-digit',
        })
    } - ${
        formatDate(momentEndViewDate.toDate(), {
            day: 'numeric', month: 'short', year: '2-digit',
        })
    }`
}
export const viewBoundText = (
    startViewDate: SchedulerDateTime, endViewDate: SchedulerDateTime | undefined, type: string, currentDate: SchedulerDateTime, intervalCount: any, formatDate: any,
) => (calculateTextByDays(
    startViewDate, endViewDate, formatDate,
    type === WEEKDAY_INTERVAL ? LONG_WEEK_DAY_OPTIONS : EMPTY_OPTIONS,
))

const StyledDiv = styled.div`
  padding: 12px 24px 12px;
  backgroundColor: white;
  box-sizing: border-box;

  & .text {
    color: var(--primary-color);
    display: inline-block;
    font-size: .9em;
  }

  & .title {
    color: var(--primary-color);
    font-size: 1.3em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .icon {
    vertical-align: middle;
    color: var(--primary-color);
  }

  & .textCenter {
    text-align: center;
    height: 20px;
  }

  & .dateAndTitle {
    line-height: 1.4;
    display: flex;
  }

  & .contentContainer {
    padding-bottom: 12px;
  }

  & .resourceContainer {
    padding-bottom: 2px;
  }

  & .recurringIcon {
    position: absolute;
    padding-top: 7px;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    width: 21px;
    height: 21px;
  }

  & .relativeContainer {
    position: relative;
    width: 100%;
    height: 100%;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: .5em;
  padding-bottom: 16px;
`

const DateText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PatientInfoText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Line = styled.div`
  width: 2px;
  background-color: #80B0BE;
  height: 1.5em;
`

const ContentComponent = ({
                              children,
                              appointmentData,
                              appointmentResources,
                              formatDate,
                          }: AppointmentTooltip.ContentProps & { appointmentResources?: any }) => {
    const weekDays = useMemo(() => appointmentData && viewBoundText(
        appointmentData.startDate, appointmentData.endDate, WEEKDAY_INTERVAL,
        appointmentData.startDate, 1, formatDate,
    ), [ appointmentData, formatDate ])
    return (
        <StyledDiv>
            <Container>
                <div className={ classNames([ 'title', 'dateAndTitle' ]) }>
                    { appointmentData && appointmentData.title }
                </div>
                <DateText>
                    <div className={ classNames([ 'text', 'dateAndTitle' ]) }>
                        <Icon icon={ 'schedule' } style={ {
                            width: '1.3em',
                            height: '1.3em',
                            fill: 'var(--primary-color)',
                            marginRight: '.6em',
                        } }/>
                        { weekDays }
                    </div>
                    <Line></Line>
                    <div className={ 'text' }>
                        { `${ appointmentData && formatDate(appointmentData.startDate, {
                            hour: 'numeric',
                            minute: 'numeric',
                        }) } - ${ appointmentData && formatDate(appointmentData.endDate, {
                            hour: 'numeric',
                            minute: 'numeric',
                        }) }` }
                    </div>
                </DateText>
                <PatientInfoText>
                    <Icon icon={ 'info' } style={ {
                        width: '1.3em',
                        height: '1.3em',
                        fill: 'var(--primary-color)',
                        marginRight: '.6em',
                    } }/>
                    <div className={ 'text' }>
                        { appointmentData && appointmentData.beneficiary.beneficiaryId }, { appointmentData && appointmentData.beneficiary.phoneNumber.asPhoneNumber() }
                    </div>
                </PatientInfoText>
                { appointmentData && appointmentData.comment && (
                    <div className={ 'text' }
                         style={ { fontSize: '.7em', textOverflow: 'ellipsis', width: '100%', overflow: 'hidden' } }>
                        { appointmentData.comment }
                    </div>
                ) }
            </Container>
            {
                appointmentResources.map((resourceItem: any) => (
                    <Grid container alignItems="center" className={ 'resourceContainer' }
                          key={ `${ resourceItem.fieldName }_${ resourceItem.id }` }>
                        <Grid item xs={ 10 }>
                            <div className={ 'text' }>
                                { resourceItem.text }
                            </div>
                        </Grid>
                    </Grid>
                ))
            }
            {
                children
            }
        </StyledDiv>
    )
}

export default ContentComponent