import * as React from "react"
import styled from "styled-components"

import { ContainerStyle } from "./shared"

const Styled = {
  Input: styled.input`
    ${ContainerStyle};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  `,
}

type Props = {
  value?: number
  onChange?: (value: number) => void
  hasError?: boolean
  className?: string
}

export const NumberInput = (props: Props) => {
  const { value, onChange, hasError, className } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(e.target.valueAsNumber),
    [onChange, value],
  )

  return (
    <Styled.Input
      type="number"
      value={value?.toString()}
      onChange={_onChange}
      $hasError={hasError}
      className={className}
      // @ts-ignore Prevent AutoComplete Functionalities
      autocomplete="off"
      data-lpignore="true"
      data-form-type="other"
    />
  )
}

export default NumberInput
