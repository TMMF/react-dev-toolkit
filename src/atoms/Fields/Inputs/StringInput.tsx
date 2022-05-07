import * as React from "react"
import styled from "styled-components"

import { ContainerStyle } from "./shared"

const Styled = {
  Input: styled.input`
    ${ContainerStyle};
  `,
}

type Props = {
  value?: string
  onChange?: (value: string) => void
  hasError?: boolean
  className?: string
}

export const StringInput = (props: Props) => {
  const { value, onChange, hasError, className } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange],
  )

  return (
    <Styled.Input
      type="text"
      value={value}
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

export default StringInput
