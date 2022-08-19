import styled from 'styled-components'
import { DropdownProps } from './types'

export const DropdownWrapper = styled.div<DropdownProps>`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 10000;
`