import styled from 'styled-components'
import { ReactComponent as AngleDown } from '../../../assets/icons/arrowLeft.svg'

export const TextFilterWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  grid-row: 2;
  height: fit-content;
  color: var(--primary-color);

  & > label {
    font-size: 1.5em;
    font-weight: 500;
    position: relative;
    left: 3px;
    grid-column: 1;
    white-space: nowrap;
  }
`

export const TextInput = styled.input`
  border: 2px solid var(--primary-color);
  cursor: pointer;
  height: 2.5em;
  box-sizing: border-box;
  font-weight: 500;
  padding: .2em .7em;
  border-radius: 4px;
  grid-column: 2;
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
  white-space: nowrap;
`

export const SearchListItemWrapper = styled.div`
  &:not(:last-of-type) {
    border-bottom: 1px solid white;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: .3em .5em;
  cursor: pointer;

  &:hover {
    background-color: #0f86a8;
  }

  user-select: none;
`

export const SearchListItemsWrapper = styled.div<{ hasInput: boolean }>`
  max-height: 12em;
  overflow-y: auto;
  margin-top: ${ props => props.hasInput ? '.5em' : null };
`

export const SearchListWrapper = styled.div`
  color: white;
`

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: content-box;
  justify-content: center;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: var(--primary-color);
`

export const TRANSITIONS_TIME = 400

export const FormWrapper = styled.div`
  background-color: white;
  color: var(--primary-color);
  display: grid;
  grid-template-columns: calc(30% - 2em) 70%;
  grid-auto-rows: auto;
  align-items: start;
  font-weight: 500;
  row-gap: 1em;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  column-gap: 2em;

  & > textarea {
    resize: none;
  }
`

export const StyledDiv = styled.div`
  width: 650px;
  padding: 0 32px;
  box-sizing: border-box;
  transition: ${ () => `all ${ TRANSITIONS_TIME }ms cubic-bezier(0, 0, 0.2, 1)` };
  color: var(--primary-color);

  & h3 {
    margin: 0;
    font-weight: 500;
    grid-row: 1;
    grid-column: 1 / 3;
  }

  &.fullSize {
    padding-bottom: 24px;
  }

  &.halfSize {
    @media (min-width: 700px) and (max-width: 850px) {
      width: 400px;
    }
    @media (min-width: 850px) and (max-width: 1000px) {
      width: 480px;
    }
    @media (min-width: 1000px) and (max-width: 1150px) {
      width: 560px;
    }
  }

  & .labelWithMargins {
    margin-top: 16px;
  }

  & .notesEditor {
    margin-bottom: 4px;
    margin-top: 4px;
  }

  & .dateEditor {
    width: 45%;
    padding-top: 0 !important;
    margin-top: 16px;
    padding-bottom: 0 !important;
    margin-bottom: 0;
  }

  & .dividerLabel {
    width: 10%;
    text-align: center;
    padding-top: 16px;
  }

  & .booleanEditors {
    margin-top: 7px;
  }

  @media (max-width: 570px) {
    & .dateEditors {
      flex-direction: column;
    }

    & .booleanEditors {
      flex-direction: column;
      margin-top: 15px;
    }

    & .dateEditor {
      width: 100%;

      &:first-of-type {
        margin-bottom: 0;
      }

      &:last-child {
        margin-top: 16px;
      }
    }

    & .dividerLabel {
      display: none;
    }
  }
`

export const TextArea = styled.textarea`
  border: 2px solid var(--primary-color);
  font-weight: 500;
  color: var(--primary-color);
  border-radius: 4px;
  padding: .3em .7em;

  outline: none;
`