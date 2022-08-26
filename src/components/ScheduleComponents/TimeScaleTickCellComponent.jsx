import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import styled from 'styled-components'

const VIEW_TYPES = {
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    ALL_DAY_PANEL: 'allDayPanel',
};

const SPACING_CELL_HEIGHT = {
    [VIEW_TYPES.MONTH]: 12.5,
    [VIEW_TYPES.WEEK]: 6,
    [VIEW_TYPES.DAY]: 6,
    [VIEW_TYPES.ALL_DAY_PANEL]: 5.75,
};

const StyledTableCell = styled.td`
  height: ${() => SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * 8 + 'px'};
  box-sizing: border-box;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid #80B0BE;
  text-align: left;
  padding: 16px;
  color: rgba(0, 0, 0, 0.87);

  tr:last-child & {
    border-bottom: none;
  }

  &.brightBottomBorder {
    border-bottom: #80B0BE;
  }

  &.allDayCell {
    height: ${() => SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL] * 8 + 'px'};
  }
`

const TimeScaleTickCellComponent = ({
                                        startDate = new Date(),
                                        endDate = new Date(),
                                        endOfGroup = false,
                                        groupingInfo = {},
                                        isAllDay = false,
                                        ...restProps
                                    }) => (
    <StyledTableCell
        className={classNames({
            "brightBottomBorder": endOfGroup,
            "allDayCell": isAllDay,
        })}
        {...restProps}
    />
);

TimeScaleTickCellComponent.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    endOfGroup: PropTypes.bool,
    isAllDay: PropTypes.bool,
};

TimeScaleTickCellComponent.defaultProps = {
    startDate: undefined,
    endDate: undefined,
    endOfGroup: false,
    groupingInfo: undefined,
    isAllDay: false,
};

export default TimeScaleTickCellComponent