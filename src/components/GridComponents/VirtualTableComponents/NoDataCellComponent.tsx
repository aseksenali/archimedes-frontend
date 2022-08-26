import React from 'react'
import { Table } from '@devexpress/dx-react-grid'

const NoDataCellComponent = (props: Table.NoDataCellProps) => {
    return (
        <td>
            { props.getMessage('noData') }
        </td>
    )
}

export default NoDataCellComponent