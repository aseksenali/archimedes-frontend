import React from 'react'
import styled from 'styled-components'
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #80B0BE;
  border-right: 1px solid #80B0BE;
`

const DayScaleEmptyCellComponent = ({ children, ...restProps }: WeekView.DayScaleEmptyCellProps) => {
    return (
        <StyledDiv { ...restProps }>
            { children }
        </StyledDiv>
    )
}

export default DayScaleEmptyCellComponent