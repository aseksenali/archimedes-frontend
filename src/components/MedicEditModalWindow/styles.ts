import styled from 'styled-components'

export const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  column-gap: 1em;
  height: 5%;
  padding-bottom: 1em;
`

export const SaveButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  height: 2em;
  padding: 0 1.5em;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`

export const CloseButton = styled.button`
  background: none;
  height: 2em;
  padding: 0 0;
  border: none;
  display: inline-flex;

  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const ModalBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`

export const TwoColumnInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  column-gap: 2em;
`

export const ButtonWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1em;
`

export const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`