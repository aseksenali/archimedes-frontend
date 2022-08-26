import * as React from 'react'
import classNames from 'clsx'
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import styled from 'styled-components'

const StyledTableCell = styled.td`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  outline: 0;
  padding: 0 16px;
  border-collapse: collapse;
  border-spacing: 0;
  user-select: none;
  text-align: center;
  border-bottom: none;
  box-sizing: border-box;
  border-right: 1px solid #80B0BE;
  position: sticky;
  top: 0;
  
  table & {
    border-bottom: 1px solid #80B0BE;
  }

  &:last-child {
    border-right: none;
  }

  &:only-child {
    text-align: left;
    padding-left: 16px;
  }

  &.highlightedCell {
    background-color: var(--primary-color);
  }

  & .dayOfWeek {
    margin: 0;
    color: #80B0BE;
    line-height: 1.17;
  }

  & .dayOfMonth {
    color: #80B0BE;
    line-height: 1.2;
    font-size: 1.8rem;
  }

  & .highlightedText {
    color: white;
    font-weight: bold;
  }

  & > .dayView {
    text-align: center;
    display: inline-block;
    width: 100%;
  }
`

const DayScaleCell = ({
                          startDate,
                          endDate,
                          today,
                          formatDate,
                          endOfGroup,
                          groupingInfo,
                          // @deprecated
                          hasRightBorder,
                      }: WeekView.DayScaleCellProps) => (
    <StyledTableCell className={ classNames({
        'highlightedCell': today,
    }) }>
        <div className={ 'dayView' }>
            <p
                className={ classNames({
                    'dayOfWeek': true,
                    'highlightedText': today,
                }) }
            >
                { formatDate(startDate, { weekday: 'short' }) }
            </p>
            <div
                className={ classNames({
                    'dayOfMonth': true,
                    'highlightedText': today,
                }) }
            >
                { formatDate(startDate, { day: 'numeric' }) }
            </div>
        </div>
    </StyledTableCell>
)

export default DayScaleCell
