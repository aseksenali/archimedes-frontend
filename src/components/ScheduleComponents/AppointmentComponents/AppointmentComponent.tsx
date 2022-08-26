import * as React from 'react'
import { ForwardedRef } from 'react'
import classNames from 'clsx'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'
import styled from 'styled-components'

const StyledDiv = styled.div`
  user-select: none;
  position: absolute;
  height: 98%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid var(--primary-color);
  background-clip: padding-box;
  border-radius: 4px;
  background-color: var(--primary-color);

  &:hover {
    background-color: #036d8c;
  }

  &:focus {
    background-color: var(--primary-color);
    outline: 0;
  }

  &.clickableAppointment {
    cursor: pointer;
  }

  &.shadedAppointment {
    //background-color: rgba(2, 118, 153, .7);
    background-color: rgba(128, 176, 190, .4);
    border: none;

    &:hover {
      background-color: #5096ab;
    }
  }
`

const AppointmentComponent = ({
                                  children,
                                  data,
                                  onClick: handleClick,
                                  draggable,
                                  isShaded,
                                  resources,
                                  forwardedRef,
                                  ...restProps
                              }: Appointments.AppointmentProps & { forwardedRef?: ForwardedRef<HTMLDivElement> }) => {
    const onClick = handleClick
        ? {
            onClick: (e: React.MouseEvent) => {
                handleClick({ target: e.target, data })
            },
        }
        : null

    const clickable = onClick || restProps.onDoubleClick || draggable
    return (
        <StyledDiv
            ref={ forwardedRef }
            className={ classNames({
                clickableAppointment: clickable,
                shadedAppointment: isShaded,
            }) }
            { ...onClick }
            { ...restProps }
        >
            { children }
        </StyledDiv>
    )
}

export default AppointmentComponent
