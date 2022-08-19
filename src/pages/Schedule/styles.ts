import styled from 'styled-components'
import Filter from '../../components/Filter/Filter'

export const StyledFilter = styled(Filter)`
  z-index: 100;
`

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap: 2em;
  align-items: center;
  flex-wrap: nowrap;
  height: 12%;
  padding: 2em;
`

export const ResetFiltersButton = styled.button`
  background: white;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  width: 2em;
  height: 2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: .5em;

  &:hover {
    background-color: var(--primary-color);

    & > svg {
      color: white;
    }
  }

  & > svg {
    font-size: 1.5em;
    color: var(--primary-color)
  }
`
