import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledHead = styled.thead<{ isFixed: boolean }>`
  height: 53px;
  box-sizing: border-box;
  display: table-header-group;
  position: sticky;
  z-index: 350;

  & th, & td {
    background-color: white;
    position: ${ props => props.isFixed ? 'sticky' : undefined };
    top: 0;
    z-index: 350;
  }
`

const HeadComponent = (props: PropsWithChildren<any>) => {
    return (
        <StyledHead isFixed={ props.isFixed }>
            { props.children }
        </StyledHead>
    )
}

export default HeadComponent