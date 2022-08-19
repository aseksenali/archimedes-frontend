import styled from 'styled-components'

export const SearchListWrapper = styled.div`
  color: white;
`

export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: var(--primary-color);
`

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: content-box;
  justify-content: center;
  align-items: center;
`

export const SearchListItemsWrapper = styled.div<{ hasInput: boolean }>`
  max-height: 12em;
  overflow-y: auto;
  margin-top: ${ props => props.hasInput ? '.5em' : null };
`