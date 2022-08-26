import { Table } from '@devexpress/dx-react-grid'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const CellComponent = (props: Table.DataCellProps) => {
    const { column, value, colSpan, rowSpan } = props
    if (column.name !== 'medicName') {
        return <HighlightedCell style={ undefined } { ...props }/>
    }
    return (
        <td style={ {
            border: '1px solid #EDF5F8',
            color: 'var(--primary-color)',
            height: '53px',
            padding: '1em',
            left: 0,
            position: 'sticky',
            backgroundColor: 'white',
        } }
            colSpan={ colSpan } rowSpan={ rowSpan }>
            { value }
        </td>
    )
}

const HighlightedCell = ({
                             value,
                             style,
                             ...restProps
                         }: Table.DataCellProps & { style: React.CSSProperties | undefined }) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate({ pathname: `/views/schedule/${ value.medicId }` })
    }
    const isHoliday = useMemo(() => value.schedule === 'Выходной', [ value.schedule ])

    return (
        <CellWrapper
            value={ value }
            { ...restProps }
            style={ {
                backgroundColor: isHoliday ? '#edf5f8' : value.hasFreeWindows === undefined ? 'purple' : value.hasFreeWindows ? '#c2f9e5' : '#fcafaf',
                border: '1px solid #EDF5F8',
                cursor: 'pointer',
                ...style,
            } } onClick={ onClick }>
            <div style={ {
                color: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            } }>
                { value.schedule }
            </div>
        </CellWrapper>
    )
}

const CellWrapper = ({
                         style,
                         ...props
                     }: Table.DataCellProps & { style: React.CSSProperties | undefined, onClick: () => void }) => {
    return (
        <td style={ style } onClick={ props.onClick }>
            { props.children }
        </td>
    )
}

export default CellComponent