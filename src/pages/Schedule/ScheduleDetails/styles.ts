import styled from 'styled-components'
import { ReactComponent as AngleDown } from '../../../assets/icons/arrowLeft.svg'
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg'

export const HeaderDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--primary-color);
  padding: 0 1em;
  height: calc(5% + 1.4em);
  font-size: 1.5em;
  column-gap: .5em;

  & > svg {
    cursor: pointer;
  }
`

export const BackIcon = styled(AngleDown)`
  width: 1em;
  height: 100%;
  fill: var(--primary-color);
`

export const EditIcon = styled(Edit)`
  fill: var(--primary-color);
  width: 1em;
  height: 100%;
`