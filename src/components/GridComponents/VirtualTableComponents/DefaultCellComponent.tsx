import { Table } from '@devexpress/dx-react-grid'
import React from 'react'

const CellComponent = (props: Table.DataCellProps) => {
    const { value, colSpan, rowSpan } = props
    return (
        <td style={ {
            border: '1px solid #EDF5F8',
            color: 'var(--primary-color)',
            height: '53px',
            padding: '1em',
            left: 0,
        } }
            colSpan={ colSpan } rowSpan={ rowSpan }>
            { value }
        </td>
    )
}


export default CellComponent