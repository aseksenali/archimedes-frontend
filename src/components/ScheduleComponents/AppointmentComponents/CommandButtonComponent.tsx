import React from 'react'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import styled from 'styled-components'
import { Icon } from '../../icons'

const OPEN_COMMAND_BUTTON = 'open'
const CLOSE_COMMAND_BUTTON = 'close'
const DELETE_COMMAND_BUTTON = 'delete'

const getIcon = (id: Pick<AppointmentTooltip.CommandButtonProps, 'id'>) => {
    switch (id) {
        case OPEN_COMMAND_BUTTON:
            return <Icon icon={ 'pen-solid' } style={ { width: '1.3rem', height: '1.3rem' } }/>
        case CLOSE_COMMAND_BUTTON:
            return <Icon icon={ 'cross' } style={ { width: '1rem', height: '1rem' } }/>
        case DELETE_COMMAND_BUTTON:
            return <Icon icon={ 'edit' } style={ { width: '1.3rem', height: '1.3rem' } }/>
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