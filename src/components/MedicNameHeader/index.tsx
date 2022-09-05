import React from 'react'
import { MedicNameHeaderProps } from './types'
import styles from './MedicNameHeader.module.scss'
import { Icon } from '../icons'
import { Skeleton } from '@mui/material'

const MedicNameHeader = ({ onBackClick, medic, onEditClick }: MedicNameHeaderProps) => {
    return (
        <div className={ styles.header }>
            <Icon icon={ 'arrowLeft' } onClick={ onBackClick } className={ styles.back_icon }/>
            { medic?.medicName === undefined ? <Skeleton width={ 300 }/> : medic.medicName }
            <Icon icon={ 'edit' } onClick={ onEditClick } className={ styles.edit_icon }/>
        </div>
    )
}

export default MedicNameHeader