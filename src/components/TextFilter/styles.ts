import styled from 'styled-components'
import { ReactComponent as AngleDown } from '../../assets/icons/arrowLeft.svg'

export const TextFilterWrapper = styled.div<{ widthSize: number }>`
  display: inline-flex;
  flex-direction: column;
  row-gap: .3em;
  width: ${ props => `${ props.widthSize }%` };
  height: content-box;
  color: var(--primary-color);

  & > label {
    font-size: 12px;
    position: relative;
    left: 3px;
    white-space: nowrap;
  }
`

export const TextInput = styled.input`
  border: 2px solid var(--primary-color);
  cursor: pointer;
  box-sizing: border-box;
  padding: .2em .3em;
  border-radius: 4px;
  position: relative;
  color: var(--primary-color);
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(0, 96, 124, 0.5);
    font-style: italic;
  }
`

export const Icon = styled(AngleDown)<{ open: boolean }>`
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

export const TextInputWrapper = styled.div`
  position: relative;
  white-space: nowrap;
`