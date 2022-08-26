import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui'
import React from 'react'

const GroupCellComponent = (props: TableGroupRow.CellProps) => {
    return (
        <TableGroupRow.Cell { ...props } style={ { borderBottom: '1px solid #EDF5F8' } }>
            <span>{ props.row.value }</span>
        </TableGroupRow.Cell>
    )
}

export default GroupCellComponent