import styled from 'styled-components'

const DateInput = styled.span`
  border: none;
  width: 130px;
  cursor: pointer;
  border-bottom: 1px solid var(--primary-color);
  padding: 0;
  margin: 0 5px;
  color: var(--primary-color);
  outline: none;
  text-align: center;
`

const DateRangePickerWrapper = styled.div`
  margin-top: 1em;
  position: relative;
  display: inline-block;
  width: content-box;
  height: content-box;
`

const Day = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #80b0be;
    color: #00607c;
  }

  &.selection_border {
    background-color: blue !important;
    color: white !important;
  }

  &.selected {
    &::before {
      content: '';
      width: 100%;
      height: 2px;
      display: block;
      background-color: white;
    }

    background-color: white;
  }

  &.different_month {
    color: #afafaf;
  }
`

export { DateInput, DateRangePickerWrapper, Day }