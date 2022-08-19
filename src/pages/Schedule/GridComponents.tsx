import React, { useMemo } from 'react'
import { Grid, Table } from '@devexpress/dx-react-grid-material-ui'
import { useNavigate } from 'react-router-dom'
import DataCellProps = Table.DataCellProps

export const HighlightedCell = ({
                                    value,
                                    style,
                                    ...restProps
                                }: DataCellProps & { style: React.CSSProperties | undefined }) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate({ pathname: '/views/schedule/details' })
    }
    const isHoliday = useMemo(() => value.schedule === 'Выходной', [ value.schedule ])

    return (
        <Table.Cell
            value={ value }
            { ...restProps }
            style={ {
                backgroundColor: isHoliday ? '#edf5f8' : value.hasFreeWindows ? '#c2f9e5' : '#fcafaf',
                borderRight: '1px solid #cecece',
                cursor: 'pointer',
                ...style,
            } } onClick={ onClick }>
        <span style={ {
            color: 'var(--primary-color)',
        } }>
                { value.schedule }
        </span>
        </Table.Cell>
    )
}

export const Cell = (props: DataCellProps) => {
    const { column } = props
    if (column.name !== 'medicName') {
        return <HighlightedCell style={ undefined } { ...props }/>
    }
    return <Table.Cell style={ { borderRight: '1px solid #cecece', color: 'var(--primary-color)' } } { ...props } />
}

export const Root = (props: Grid.RootProps) => <Grid.Root { ...props }
                                                          style={ { height: '80%', color: 'var(--primary-color)' } }/>