import * as React from 'react'
import { RefObject } from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import styles from './RowComponent.module.scss'
import { useRouter } from 'next/router'

const TableRow = ({
                      children,
                      row, tableRow,
                      forwardedRef,
                  }: Table.DataRowProps) => {
    const ref = forwardedRef as RefObject<HTMLTableRowElement>
    const router = useRouter()
    const onClick = () => router.push(`/medicInfo/${ row.medicId }`)
    return (
        <tr className={ styles.row } ref={ ref } onClick={ onClick }>
            { children }
        </tr>
    )
}

export default TableRow