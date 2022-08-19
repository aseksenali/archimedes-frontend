import styled from 'styled-components'

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