import React from 'react'
import { ScheduleHeaderProps } from './types'
import * as styled from './styles'

const ScheduleHeader = ({ onBackClick, medic }: ScheduleHeaderProps) => {
    return (
        <styled.HeaderDiv>
            <styled.BackIcon onClick={ onBackClick }/>
            { medic && medic.medicName }
            <styled.EditIcon/>
        </styled.HeaderDiv>
    )
}

export default ScheduleHeader