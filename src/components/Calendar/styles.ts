import styled from 'styled-components'

export const MonthWrapper = styled.div`
  display: inline-flex;
  min-width: 10em;
  color: white;
  justify-content: space-between;
  font-weight: bold;
`

export const YearWrapper = styled.div`
  display: inline-flex;
  color: white;
  justify-content: space-between;
  font-weight: bold;
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-bottom: 1px solid white;
  padding: .5em;

  & i {
    color: white;
  }
`

export const NavigationButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: white;
`

export const WeekDay = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
`

export const CalendarWrapper = styled.div`
  color: white;
  padding: .5em 1em 1em 1em;
`

export const Month = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 4px;
`

export const WeekHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`