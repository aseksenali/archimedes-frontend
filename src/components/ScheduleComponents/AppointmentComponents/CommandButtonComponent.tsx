import React from 'react'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit_2.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icons/cross.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/edit.svg'
import styled from 'styled-components'

const OPEN_COMMAND_BUTTON = 'open'
const CLOSE_COMMAND_BUTTON = 'close'
const DELETE_COMMAND_BUTTON = 'delete'

const getIcon = (id: Pick<AppointmentTooltip.CommandButtonProps, 'id'>) => {
    switch (id) {
        case OPEN_COMMAND_BUTTON:
            return <EditIcon style={ { width: '1.3rem', height: '1.3rem' } }/>
        case CLOSE_COMMAND_BUTTON:
            return <CloseIcon style={ { width: '1rem', height: '1rem' } }/>
        case DELETE_COMMAND_BUTTON:
            return <DeleteIcon style={ { width: '1.3rem', height: '1.3rem' } }/>
        default:
            return null
    }
}

const StyledDiv = styled.div`
  width: 3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: var(--primary-color);
  cursor: pointer;
`

const CommandButtonComponent = ({
                                    id, onExecute, ...restProps
                                }: AppointmentTooltip.CommandButtonProps) => (
    <StyledDiv onClick={ onExecute } { ...restProps }>
        { getIcon(id as Pick<AppointmentTooltip.CommandButtonProps, 'id'>) }
    </StyledDiv>
)

export default CommandButtonComponent