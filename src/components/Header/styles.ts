import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 30px;
  background-color: #EDF5F8;
  box-shadow: 0 0 10px 1px #ccc;
  color: var(--primary-color);
  height: 10%;
`

export const Button = styled.button`
  padding: .3em 1em;
  background: none;
  outline: none;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  color: var(--primary-color)
`

export const HeaderRightSide = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5em;
  align-items: center;
  white-space: nowrap;
  column-gap: 2em;
`

export const UserInfo = styled.div`
  text-align: right;

  & > p {
    margin: 0;

    &:first-of-type {
      font-size: 1em;
    }

    &:last-of-type {
      font-size: .7em;
    }
  }
`