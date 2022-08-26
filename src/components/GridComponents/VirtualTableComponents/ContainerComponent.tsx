import * as React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: auto;
  -webkit-box-flex: 1;
  width: 100%;
  box-sizing: border-box;
`

const ContainerComponent = ({ forwardedRef, ...props }: any) => {
    return (
        <StyledDiv { ...props } ref={ forwardedRef }>
            { props.children }
        </StyledDiv>
    )
}

export default ContainerComponent