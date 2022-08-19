import styled from 'styled-components'

const WeekPickerWrapper = styled.div`
  color: var(--primary-color);
  display: inline-block;
  position: relative;
  width: 22%;
  top: .5em;
  height: content-box;
`

const Day = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 1.5em;
  height: 1.5em;
  margin: .1em;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: #80b0be;
    color: #00607c;
  }

  &.selected {
    background-color: white !important;
    color: #00607c !important;
    font-weight: bold !important;
  }

  &.today {
    font-weight: bold;
  }

  &.different_month {
    color: #ccc;
  }
`

const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0);

  &.selected {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }
`

export { WeekPickerWrapper, Day, Week }