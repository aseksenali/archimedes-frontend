import { Table } from '@devexpress/dx-react-grid'
import React from 'react'
import HighlightedCell from './HighlightedCell'
import styles from './CellComponent.module.scss'

const CellComponent = (props: Table.DataCellProps) => {
    const { column, value, colSpan, rowSpan } = props
    if (column.name !== 'medicName') {
        return <HighlightedCell { ...props }/>
    }
    return (
        <td className={ styles.cell }
            colSpan={ colSpan } rowSpan={ rowSpan }>
            { value }
        </td>
    )
}

export default CellComponent