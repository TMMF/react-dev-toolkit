import * as React from "react"
import styled from "styled-components"

import { ChevronDownIcon } from "../../Icons"
import { ContainerStyle } from "./shared"

const Styled = {
  Select: styled.select`
    appearance: none;
    background-color: white;

    ${ContainerStyle};
  `,
  ChevronDownIcon: styled(ChevronDownIcon)`
    position: absolute;
    top: 13px;
    right: 6px;
    color: #aaaaaa;
  `,
  Option: styled.option``,
}

type Props<Values extends string> = {
  value?: Values
  onChange?: (value: Values) => void
  hasError?: boolean
  className?: string
}

export const SelectInput = <Values extends string>(props: Props<Values>) => {
  const { value, onChange, hasError, className } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange?.(e.target.value as Values),
    [onChange],
  )

  return (
    <>
      <Styled.Select
        value={value}
        onChange={_onChange}
        $hasError={hasError}
        className={className}
      >
        <Styled.Option value="Test 1">Test 1</Styled.Option>
        <Styled.Option value="Test 2">Test 2</Styled.Option>
        <Styled.Option value="Test 3">Test 3</Styled.Option>
      </Styled.Select>
      <Styled.ChevronDownIcon />
    </>
  )
}

export default SelectInput
