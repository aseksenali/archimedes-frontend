import * as React from 'react'
import classNames from 'clsx'
import styled from 'styled-components'
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'

type HourMinuteOptionsType = {
    hour: 'numeric' | '2-digit' | undefined
    minute: 'numeric' | '2-digit' | undefined
}

const HOUR_MINUTE_OPTIONS: HourMinuteOptionsType = { hour: 'numeric', minute: 'numeric' }

const VIEW_TYPES = {
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    ALL_DAY_PANEL: 'allDayPanel',
}

export const SPACING_CELL_HEIGHT = {
    [VIEW_TYPES.MONTH]: 12.5,
    [VIEW_TYPES.WEEK]: 6,
    [VIEW_TYPES.DAY]: 6,
    [VIEW_TYPES.ALL_DAY_PANEL]: 5.75,
}

export const SPACING_LABEL_HEIGHT = SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK]

const StyledDiv = styled.div`
  user-select: none;
  border: 0;
  height: ${ () => SPACING_LABEL_HEIGHT * 8 + 'px' };
  line-height: ${ () => SPACING_LABEL_HEIGHT * 8 + 'px' };
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  padding: 0 8px 0 2px;

  & .text {
    font-size: 0.9rem;
    white-space: nowrap;
    color: #80B0BE;
  }

  &.emptyLabel {
    height: ${ () => SPACING_LABEL_HEIGHT * 4 + 'px' };

    &:last-child {
      height: ${ () => (SPACING_LABEL_HEIGHT * 4 - 1) + 'px' };
    }
  }
`

const TimeScaleLabelComponent = ({
                                     time,
                                     formatDate,
                                     groupingInfo,
                                     endOfGroup,
                                 }: WeekView.TimeScaleLabelProps) => (
    <StyledDiv
        className={ classNames({
            'emptyLabel': !time,
        }) }
    >
        { time && (
            <span className="text">
        { formatDate(time, HOUR_MINUTE_OPTIONS) }
      </span>
        ) }
    </StyledDiv>
)

export default TimeScaleLabelComponent