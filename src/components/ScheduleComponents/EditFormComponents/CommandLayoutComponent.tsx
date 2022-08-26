import * as React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import classNames from 'clsx'
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui'

const SAVE_BUTTON = 'saveButton'
const DELETE_BUTTON = 'deleteButton'
const CANCEL_BUTTON = 'cancelButton'
const TRANSITIONS_TIME = 400

const StyledGrid = styled(Grid)`
  &.root {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 32px;
    transition: ${ () => `all ${ TRANSITIONS_TIME }ms cubic-bezier(0, 0, 0.2, 1)` };
    background-color: white;
  }

  &.basic {
    width: 650px;
  }

,
& . fullSize {
  width: 1150px;
  @media (min-width: 700px) and (max-width: 850px) {
    width: 700px;
  }
  @media (min-width: 850px) and (max-width: 1000px) {
    width: 850px;
  }
  @media (min-width: 1000px) and (max-width: 1150px) {
    width: 1000px;
  }
}
`

const StyledDiv = styled('div')`
  &.line {
    background-color: #80B0BE;
    height: 36px;
    width: 1px;
  }
`

const CommandLayoutComponent = ({
                                    commandButtonComponent: CommandButton,
                                    onCommitButtonClick,
                                    onCancelButtonClick,
                                    onDeleteButtonClick,
                                    getMessage,
                                    children,
                                    fullSize,
                                    readOnly,
                                    disableSaveButton,
                                    hideDeleteButton,
                                    ...restProps
                                }: AppointmentForm.CommandLayoutProps) => (
    <StyledGrid
        className={ classNames({
            root: true,
            basic: !fullSize,
            fullSize: fullSize,
        }) }
        container
        alignItems="center"
        { ...restProps }
    >
        <CommandButton
            onExecute={ onCancelButtonClick }
            getMessage={ getMessage }
            id={ CANCEL_BUTTON }
        />
        { !readOnly && (
            <>
                { !hideDeleteButton && (
                    <>
                        <CommandButton
                            onExecute={ onDeleteButtonClick }
                            getMessage={ getMessage }
                            id={ DELETE_BUTTON }
                        />
                        <StyledDiv className={ 'line' }/>
                    </>
                ) }
                <CommandButton
                    getMessage={ getMessage }
                    onExecute={ onCommitButtonClick }
                    id={ SAVE_BUTTON }
                />
            </>
        ) }
        { children }
    </StyledGrid>
)

export default CommandLayoutComponent
