import styled from 'styled-components'

export const MainPart = styled.div`
  overflow-x: hidden;
  height: 100%;

  &::before {
    content: '';
    display: block;
    box-shadow: inset 7px 0 9px -7px rgba(0, 0, 0, 0.4);
    position: absolute;
    z-index: 10000;
    pointer-events: none;
    background: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`