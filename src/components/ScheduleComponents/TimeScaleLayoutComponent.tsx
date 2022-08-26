import * as React from 'react'
import classNames from 'clsx'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import { TicksLayout } from './TicksLayout'
import { Group, GroupOrientation } from '@devexpress/dx-react-scheduler'
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import { PureComputed } from '@devexpress/dx-core'
import styled from 'styled-components'

const VIEW_TYPES = {
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    ALL_DAY_PANEL: 'allDayPanel',
}
const VERTICAL_GROUP_ORIENTATION = 'Vertical' as GroupOrientation
const HORIZONTAL_GROUP_ORIENTATION = 'Horizontal' as GroupOrientation

const getGroupsLastRow: PureComputed<[ Group[][] | undefined ], Group[] | undefined> = groups => groups && groups[groups.length - 1]

const getLabelsForAllGroups: PureComputed<[ { startDate: Date, endDate: Date, groupingInfo?: any[] }[][], Group[][] | undefined, GroupOrientation | undefined ], { startDate: Date, endDate: Date, groupingInfo?: any[], key: Date }[][] | undefined> = (cellsData, groups, groupOrientation) => {
    return [ cellsData.map(cellsRow => ({
        startDate: cellsRow[0].startDate,
        endDate: cellsRow[0].endDate,
        groupingInfo: cellsRow[0].groupingInfo,
        key: cellsRow[0].endDate,
    })) ]
}

const SPACING_CELL_HEIGHT = {
    [VIEW_TYPES.MONTH]: 12.5,
    [VIEW_TYPES.WEEK]: 6,
    [VIEW_TYPES.DAY]: 6,
    [VIEW_TYPES.ALL_DAY_PANEL]: 5.75,
}

const StyledDiv = styled.div<{ height: number, defaultHeight: number }>`
  & .timeScaleContainer {
    width: 72px;
  }

  & .ticks {
    width: 8px;
  }

  & .cell {
    box-sizing: border-box;
    border-bottom: none;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    text-align: left;
    padding: 0;
  }

  & .verticalCell {
    border-bottom: 1px solid #80B0BE;

    tr:last-child & {
      border-bottom: none;
    }

    height: ${ props => props.height ? `${ props.height }px` : (props.defaultHeight * 8 + 'px') };
  }

  & .flexRow {
    display: flex;
    flex-direction: row;
  }
`

const TimeScaleLayoutComponent = ({
                                      labelComponent: Label,
                                      rowComponent,
                                      tickCellComponent,
                                      allDayTitleComponent: AllDayTitle,
                                      cellsData,
                                      formatDate,
                                      groupOrientation,
                                      groups,
                                      showAllDayTitle,
                                      height,
                                  }: WeekView.TimeScaleLayoutProps & { rowComponent?: any }) => {
    const groupCount = getGroupsLastRow(groups)?.length
    const cellsCount = groupCount && cellsData.length / groupCount
    const heightWithoutAllDayTitle = cellsCount && SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * cellsCount
    const defaultHeight = showAllDayTitle
        ? (heightWithoutAllDayTitle ? heightWithoutAllDayTitle + SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL] : 0)
        : (heightWithoutAllDayTitle ? heightWithoutAllDayTitle : 0)
    const calculatedHeight = (height && groupCount) ? height / groupCount : 0
    return (
        <StyledDiv
            height={ calculatedHeight }
            defaultHeight={ defaultHeight }
            className={ 'flexRow' }>
            <Table className={ 'timeScaleContainer' }>
                <TableBody>
                    { getLabelsForAllGroups(cellsData, groups, groupOrientation)?.map(
                        (groupedLabels, groupIndex) => {
                            const firstDataLabel = groupedLabels[0]
                            const lastDataLabel = groupedLabels[groupedLabels.length - 1]
                            return (
                                <TableRow key={ groupIndex.toString() }>
                                    <td
                                        className={ classNames({
                                            'cell': true,
                                            'verticalCell': groupOrientation === VERTICAL_GROUP_ORIENTATION,
                                        }) }
                                    >
                                        { AllDayTitle && <AllDayTitle getMessage={ (key) => key } fixedHeight/> }
                                        <Label
                                            key={ firstDataLabel.startDate.toLocaleTimeString() }
                                            groupingInfo={ firstDataLabel.groupingInfo }
                                            formatDate={ formatDate }
                                        />
                                        { groupedLabels.map((label, index) => (
                                            index !== cellsData.length - 1 && (
                                                <Label
                                                    time={ label.endDate }
                                                    formatDate={ formatDate }
                                                    key={ label.key.toLocaleTimeString() }
                                                    groupingInfo={ label.groupingInfo }
                                                />
                                            )
                                        )) }
                                        <Label
                                            key={ lastDataLabel.endDate.toLocaleTimeString() }
                                            groupingInfo={ lastDataLabel.groupingInfo }
                                            formatDate={ formatDate }
                                        />
                                    </td>
                                </TableRow>
                            )
                        },
                    ) }
                </TableBody>
            </Table>
            <TicksLayout
                rowComponent={ rowComponent }
                cellComponent={ tickCellComponent }
                cellsData={ cellsData }
                groupOrientation={ groupOrientation }
                groupCount={ groupCount }
                includeAllDayCell={ showAllDayTitle }
            />
        </StyledDiv>
    )
}

export default TimeScaleLayoutComponent