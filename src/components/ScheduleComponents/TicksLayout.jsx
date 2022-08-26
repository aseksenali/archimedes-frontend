import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import classNames from 'clsx';
import styled from 'styled-components'

const VERTICAL_GROUP_ORIENTATION = 'Vertical';
const HORIZONTAL_GROUP_ORIENTATION = 'Horizontal';

const StyledTable = styled.table`
    &.table {
        table-layout: fixed;
        box-sizing: border-box;
      width: 8px;
      border-right: 1px solid #80B0BE;
      background-color: white;
      display: table;
      border-collapse: collapse;
      border-spacing: 0;
    }
`

export const TicksLayout = ({
                                cellComponent: Cell,
                                rowComponent: Row,
                                cellsData,
                                groupOrientation,
                                groupCount,
                                includeAllDayCell,
                                ...restProps
                            }) => {
    const groupHeight = cellsData.length / groupCount;
    return (
        <StyledTable {...restProps} className={classNames('table')}>
            <TableBody>
                {cellsData.map(([firstDay], index) => (
                    <React.Fragment key={index.toString()}>
                        {index % groupHeight === 0 && includeAllDayCell && (
                            <Row key={(index / groupHeight).toString()}>
                                <Cell
                                    key={`all-day-tick ${index / groupHeight}`}
                                    isAllDay
                                    startDate={firstDay.startDate}
                                    endDate={firstDay.endDate}
                                    endOfGroup={false}
                                    groupingInfo={firstDay.groupingInfo}
                                />
                            </Row>
                        )}
                        <Row key={(firstDay.startDate + index).toString()}>
                            <Cell
                                key={index.toString()}
                                startDate={firstDay.startDate}
                                endDate={firstDay.endDate}
                                endOfGroup={firstDay.endOfGroup && groupOrientation === VERTICAL_GROUP_ORIENTATION}
                                groupingInfo={firstDay.groupingInfo}
                            />
                        </Row>
                    </React.Fragment>
                ))}
            </TableBody>
        </StyledTable>
    );
};

TicksLayout.propTypes = {
    cellsData: PropTypes.arrayOf(Array).isRequired,
    cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
    groupCount: PropTypes.number,
    includeAllDayCell: PropTypes.bool,
};

TicksLayout.defaultProps = {
    groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
    groupCount: 1,
    includeAllDayCell: false,
};
