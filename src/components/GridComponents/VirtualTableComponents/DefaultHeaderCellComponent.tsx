import styled from 'styled-components'
import { TableHeaderRow } from '@devexpress/dx-react-grid'
import React from 'react'

const StyledTh = styled.th`
  background-color: white;
  border: 1px solid #EDF5F8;
  text-align: left;
  padding: 1em;
`

const HeaderCellComponent = (props: TableHeaderRow.CellProps) => {
    // @ts-ignore
    const { style } = props
    return (
        <StyledTh style={ style } colSpan={ props.colSpan }
                  rowSpan={ props.rowSpan }>
            <div style={ { zIndex: 350 } }>{ props.column.title }</div>
        </StyledTh>
    )
}

export default HeaderCellComponent