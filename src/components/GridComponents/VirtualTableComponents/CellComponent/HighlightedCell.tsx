import { Table } from '@devexpress/dx-react-grid'
import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'
import styles from './HighlightedCell.module.scss'

const HighlightedCell = ({
                             value,
                             ...restProps
                         }: Table.DataCellProps) => {
    const router = useRouter()
    const onClick = async () => {
        await router.push({ pathname: `/schedule/${ value.medicId }` })
    }
    const isHoliday = useMemo(() => value.schedule === 'Выходной', [ value.schedule ])
    return (
        <CellWrapper className={ styles.wrapper }
                     value={ value }
                     { ...restProps }
                     style={ {
                         backgroundColor: isHoliday ? '#edf5f8' : value.hasFreeWindows === undefined ? '#edf5f8' : value.hasFreeWindows ? '#c2f9e5' : '#fcafaf',
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
                         className,
                         ...props
                     }: Table.DataCellProps & { style: React.CSSProperties | undefined, onClick: () => void, className: string }) => {
    if (props.value.hasFreeWindows === undefined) return (
        <td style={ { position: 'relative' } } className={ className }>
            <Skeleton variant={ 'rectangular' } height={ '100%' } width={ '100%' } sx={ { bgcolor: '#edf5f8' } }
                      style={ { position: 'absolute', top: '0' } }/>
        </td>
    )
    return (
        <td style={ style } onClick={ props.onClick } className={ className }>
            { props.children }
        </td>
    )
}

export default HighlightedCell