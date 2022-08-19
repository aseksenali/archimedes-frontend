import styled from 'styled-components'

const SVG = styled.svg`
  background-color: rgba(0, 0, 0, 0);
  color: white;
  min-width: 1.5em;
  min-height: 1.5em;
  max-width: 1.5em;
  max-height: 1.5em;
  stroke-width: 10;
  fill: white;
  stroke: var(--primary-color);

  .check {
    stroke-dasharray: 70;
    stroke-dashoffset: 70;
    fill: none;
    transition: stroke-dashoffset .1s linear;
  }
`

const Label = styled.label`
  display: inline-flex;
  justify-content: start;
  align-items: center;
  user-select: none;
`

const Box = styled.input.attrs({ type: 'checkbox', readOnly: true })`
  display: none;
  pointer-events: none;

  & + ${ Label } {
    cursor: pointer;

    span {
      margin-left: .3em;
    }
  }

  &:checked + ${ Label } {
    .check {
      stroke-dashoffset: 0;
    }
  }
`

const CheckboxWrapper = styled.div`
  display: flex;
`

export { SVG, Box, Label, CheckboxWrapper }