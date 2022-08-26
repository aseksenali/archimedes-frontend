import * as React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin-left: 4px;
  overflow: auto;
  height: 75.7%;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
`

const RootComponent = ({
                           ...restProps
                       }) => {
    return (
        <StyledDiv
            { ...restProps }>
        </StyledDiv>
    )
}

export default RootComponent
