import styled from 'styled-components'
import InputMask from 'react-input-mask'
import { Icon } from '../icons'

export const StyledLabel = styled.label`
  font-weight: bold;
  width: 180px;
  display: inline-block;
`

export const StyledInput = styled.input<{ cursor: 'pointer' | 'text' }>`
  border: 2px solid var(--primary-color);
  cursor: ${ props => props.cursor };
  width: 100%;
  height: 2em;
  box-sizing: border-box;
  font-weight: 500;
  padding: .1em .3em;
  border-radius: 8px;
  grid-column: 2;
  position: relative;
  color: var(--primary-color);

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(0, 96, 124, 0.5);
    font-style: italic;
  }
`

export const LabeledInputWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

export const TextInputWrapper = styled.div`
  position: relative;
  white-space: nowrap;
  display: inline-block;
  width: calc(100% - 180px);
`

export const StyledIcon = styled(Icon)<{ open: boolean }>`
  position: relative;
  right: 1.5em;
  pointer-events: none;
  transition: transform .1s;
  width: 1em;
  height: 100%;
  top: ${ props => props.open ? '.2em' : '.25em' };
  transform: ${ props => props.open ? 'rotateZ(90deg)' : 'rotateZ(-90deg)' };
  fill: var(--primary-color);
`

export const StyledInputMask = styled(InputMask)`
  border: 2px solid var(--primary-color);
  cursor: text;
  width: 100%;
  height: 2em;
  box-sizing: border-box;
  font-weight: 500;
  padding: .1em .3em;
  border-radius: 8px;
  grid-column: 2;
  position: relative;
  color: var(--primary-color);

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(0, 96, 124, 0.5);
    font-style: italic;
  }
`