import * as React from 'react'
import classNames from 'clsx'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import styled from 'styled-components'

const StyledDiv = styled.div`
  &.head {
    position: relative;
    padding: 4px 4px 0 8px;
    min-height: 12px;
  }

  &.flexContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
  }

  & .line {
    background-color: #80B0BE;
    height: 28px;
    display: flex;
    margin-top: 8px;
    width: 2px;
  }
`

const HeaderComponent = ({
                             appointmentData,
                             commandButtonComponent: CommandButton,
                             showOpenButton,
                             showCloseButton,
                             showDeleteButton,
                             commandButtonIds,
                             onOpenButtonClick,
                             onDeleteButtonClick,
                             onHide,
                             children,
                             ...restProps
                         }: AppointmentTooltip.HeaderProps) => {
    const handleOpenButtonClick = () => {
        onHide && onHide()
        onOpenButtonClick && onOpenButtonClick()
    }
    return (
        <StyledDiv
            className={ classNames([ 'head', 'flexContainer' ]) }
            { ...restProps }
        >
            { showOpenButton && (
                <CommandButton id={ 'open' } onExecute={ handleOpenButtonClick }/>
            ) }
            { showDeleteButton
                && <CommandButton id={ 'delete' } onExecute={ onDeleteButtonClick }/> }
            { children }
            { showCloseButton && (
                <StyledDiv className={ 'flexContainer' }>
                    <div className={ 'line' }/>
                    <CommandButton id={ 'close' } onExecute={ onHide }/>
                </StyledDiv>
            ) }
        </StyledDiv>
    )
}

export default HeaderComponent