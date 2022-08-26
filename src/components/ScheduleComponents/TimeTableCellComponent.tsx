import * as React from 'react'
import styled from 'styled-components'
import classNames from 'clsx'
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import { Group } from '@devexpress/dx-react-scheduler'

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

const StyledTableCell = styled.td.attrs(props => ({
    className: props.className,
}))<{ shadedHeight: string | undefined }>`
  position: relative;
  height: ${ () => SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * 8 + 'px' };
  padding: 0;
  box-sizing: border-box;
  border-right: 1px solid #80B0BE;
  border-bottom: 1px solid #80B0BE;

  &:last-child {
    border-right: none;
    padding-right: 0;
  }

  tr:last-child & {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(73, 140, 159, .21);
  }

  &:focus {
    background-color: var(--primary-color);
    outline: 0;
  }

  &.shadedCell:not(.notWorkingHours) {
    background-color: rgba(128, 176, 190, .21);
  }

  &.notWorkingHours {
    background-color: rgba(246, 118, 118, .21);
  }

  & .shadedPart {
    background-color: rgba(128, 176, 190, .21);
    position: absolute;
    height: ${ props => props.shadedHeight };
    width: 100%;
    left: 0;
    top: 0;

    &.notWorkingHours {
      background-color: rgba(246, 118, 118, 0);
    }

    &:not(.notWorkingHours):hover {
      background-color: rgba(73, 140, 159, .21);
    }

    td:focus & {
      opacity: 0;
    }
  }

  &.brightRightBorder {
    border-right: 1px solid #80B0BE;

    &:last-child {
      border-right: none;
    }
  }

  &.brightBorderBottom {
    border-bottom: 1px solid #80B0BE;
  }
`

const TimeTableCellComponent = (isWorkingHours: (startDate?: Date, endDate?: Date) => boolean) => (({
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

    return (
        <StyledTableCell
            shadedHeight={ currentTimeIndicatorPosition }
            className={ classNames({
                shadedCell: !isNow && isShaded,
                brightRightBorder: endOfGroup && groupOrientation === HORIZONTAL_GROUP_ORIENTATION,
                brightBorderBottom: endOfGroup && groupOrientation === VERTICAL_GROUP_ORIENTATION,
                notWorkingHours: !isWorkingHours(startDate, endDate),
            }) }
            tabIndex={ 0 }
            onDoubleClick={ (e) => {
                if (!isShaded && isWorkingHours(startDate, endDate) && onDoubleClick)
                    onDoubleClick(e)
            } }
            { ...restProps }
        >
            { isNow && isShaded && (
                <div className={ classNames({
                    shadedPart: true,
                    notWorkingHours: !isWorkingHours(startDate, endDate),
                }) }/>
            ) }
            {
                isNow && CurrentTimeIndicator && <CurrentTimeIndicator
                    top={ currentTimeIndicatorPosition }
                />
            }
            { restProps.children }
        </StyledTableCell>
    )
})

export default TimeTableCellComponent