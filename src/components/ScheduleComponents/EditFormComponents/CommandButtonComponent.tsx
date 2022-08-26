import * as React from 'react'
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui'
import classNames from 'clsx'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import '../../../helpers/stringHelper'

const SAVE_BUTTON = 'saveButton'
const DELETE_BUTTON = 'deleteButton'
const CANCEL_BUTTON = 'cancelButton'

export const StyledButton = styled.button`
  padding: 4px 14px;
  margin-left: 24px;
  height: 36px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: ensureColor(400, palette.primary),
  }

  &.textButton {
    color: white;
  }
`

export const SaveButton = React.memo(({
                                          getMessage, onExecute, ...restProps
                                      }: Omit<AppointmentForm.CommandButtonProps, 'id'> & { disabled?: boolean }) => (
    <StyledButton
        className={ classNames({
            textButton: !restProps.disabled,
        }) }
        onClick={ onExecute }
        { ...restProps }
    >
        { getMessage && getMessage('commitCommand').capitalize() }
    </StyledButton>
))

const StyledDeleteIconButton = styled(IconButton)`
  &.button {
    margin-right: 4px;
    color: var(--primary-color);
  }
`

export const DeleteButton = React.memo(({
                                            onExecute, ...restProps
                                        }: Omit<AppointmentForm.CommandButtonProps, 'id'>) => (
    <StyledDeleteIconButton
        className={ classNames('button') }
        onClick={ onExecute }
        { ...restProps }
        size="large"
    >
        <DeleteIcon/>
    </StyledDeleteIconButton>
))


const StyledCancelIconButton = styled(IconButton)`
  &.button {
    margin-right: auto;
    color: var(--primary-color);
  }
`

export const CancelButton = React.memo(({
                                            onExecute, ...restProps
                                        }: Omit<AppointmentForm.CommandButtonProps, 'id'>) => (
    <StyledCancelIconButton
        className={ classNames('button') }
        onClick={ onExecute }
        { ...restProps }
        size="large"
    >
        <CloseIcon/>
    </StyledCancelIconButton>
))

const CommandButtonComponent = React.memo(({
                                               id, getMessage, onExecute,
                                           }: AppointmentForm.CommandButtonProps) => {
    switch (id) {
        case SAVE_BUTTON:
            return (
                <SaveButton
                    getMessage={ getMessage }
                    onExecute={ onExecute }
                />
            )
        case DELETE_BUTTON:
            return (
                <DeleteButton
                    onExecute={ onExecute }
                />
            )
        case CANCEL_BUTTON:
            return (
                <CancelButton
                    onExecute={ onExecute }
                />
            )
        default:
            return null
    }
})

export default CommandButtonComponent