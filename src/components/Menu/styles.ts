import styled from 'styled-components'

export const MenuWrapper = styled.div<{ openWidth: number }>`
  width: ${ props => `${ props.openWidth }px` };
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  justify-content: flex-start;
`