import React from 'react'
import { Table } from '@devexpress/dx-react-grid'

const NoDataRowComponent = (props: Table.RowProps) => {
    return (
        <tr>
            { props.children }
        </tr>
    )
}

export default NoDataRowComponent