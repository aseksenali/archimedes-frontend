import * as React from 'react'
import { useContext, useMemo } from 'react'
import classNames from 'clsx'
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import { Group } from '@devexpress/dx-react-scheduler'
import { DateTime } from 'luxon'
import { TimeTableScheduleContext } from '../../../pages/schedule/[medicId]'
import { Skeleton } from '@mui/material'
import styles from './TimeTableCellComponent.module.scss'

const VIEW_TYPES = {
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    ALL_DAY_PANEL: 'allDayPanel',
}
const VERTICAL_GROUP_ORIENTATION = 'Vertical'
const HORIZONTAL_GROUP_ORIENTATION = 'Horizontal'

const SPACING_CELL_HEIGHT = {
    [VIEW_TYPES.MONTH]: 12.5,
    [VIEW_TYPES.WEEK]: 6,
    [VIEW_TYPES.DAY]: 6,
    [VIEW_TYPES.ALL_DAY_PANEL]: 5.75,
}


const TimeTableCellComponent = (({
                                     startDate,
                                     endDate,
                                     currentTimeIndicatorPosition,
                                     currentTimeIndicatorComponent: CurrentTimeIndicator,
                                     isShaded,
                                     endOfGroup,
                                     groupingInfo,
                                     groupOrientation,
                                     onDoubleClick,
                                     // @deprecated
                                     hasRightBorder,
                                     ...restProps
                                 }: WeekView.TimeTableCellProps & { groupingInfo?: Group[], groupOrientation?: 'Horizontal' | 'Vertical' | undefined, currentTimeIndicatorComponent?: React.ComponentType<any> }) => {
    const isNow = !!currentTimeIndicatorPosition
    const schedule = useContext(TimeTableScheduleContext)
    const isWorkingHours: boolean | undefined = useMemo(() => {
        if (schedule === undefined) return undefined
        if (startDate && endDate) {
            const startTime = DateTime.fromJSDate(startDate).convertToUTC()
            const isHoliday = startTime.isHoliday(schedule.holidays)
            const specialDaySchedule = startTime.findSpecialDay(schedule.specialDays)
            if (isHoliday) return false
            if (specialDaySchedule) return specialDaySchedule.contains(startTime)
            const workingHours = startTime.findWorkingHours(schedule.workingDays)
            return workingHours ? workingHours.contains(startTime) : false
        } else return true
    }, [ endDate, schedule, startDate ])
    if (isWorkingHours === undefined) return (
        <td className={ styles.cell } style={ { height: SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * 8 + 'px' } }
            tabIndex={ 0 }>
            <Skeleton variant={ 'rectangular' } height={ '100%' } width={ '100%' } sx={ { bgcolor: '#edf5f8' } }
                      style={ { position: 'absolute', top: '0' } }/>
        </td>
    )
    return (
        <td className={ classNames({
            [styles.cell]: true,
            [styles.shadedCell]: !isNow && isShaded,
            [styles.brightRightBorder]: endOfGroup && groupOrientation === HORIZONTAL_GROUP_ORIENTATION,
            [styles.brightBorderBottom]: endOfGroup && groupOrientation === VERTICAL_GROUP_ORIENTATION,
            [styles.notWorkingHours]: !isWorkingHours,
        }) }
            tabIndex={ 0 }
            onDoubleClick={ (e) => {
                if (!isShaded && isWorkingHours && onDoubleClick)
                    onDoubleClick(e)
            } }
            style={ { height: SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * 8 + 'px' } }
            { ...restProps }
        >
            { isNow && isShaded && (
                <div className={ classNames({
                    [styles.shadedPart]: true,
                    [styles.notWorkingHours]: !isWorkingHours,
                }) } style={ { height: currentTimeIndicatorPosition } }/>
            ) }
            {
                isNow && CurrentTimeIndicator && <CurrentTimeIndicator
                    top={ currentTimeIndicatorPosition }
                />
            }
            { restProps.children }
        </td>
    )
})

export default TimeTableCellComponent