import * as React from "react"
import styled from "styled-components"

import { ContainerStyle } from "./shared"

const Styled = {
  Root: styled.div``,
  Input: styled.input`
    appearance: none;
    margin: 0;
    height: 35px;

    &:not(:disabled):hover {
      cursor: pointer;
    }

    ${ContainerStyle};
  `,
  Container: styled.div<{ $checked?: boolean }>`
    font-size: 14px;
    font-family: monospace;

    pointer-events: none;
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    top: 8px;
    width: 100%;
    height: 35px;
  `,
}

type Props = {
  value?: boolean
  onChange?: (value: boolean) => void
  hasError?: boolean
  className?: string
}

export const StringInput = (props: Props) => {
  const { value, onChange, hasError, className } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked),
    [onChange],
  )

  return (
    <Styled.Root>
      <Styled.Input
        type="checkbox"
        checked={value}
        onChange={_onChange}
        $hasError={hasError}
        className={className}
        // @ts-ignore Prevent AutoComplete Functionalities
        autocomplete="off"
        data-lpignore="true"
        data-form-type="other"
      />
      <Styled.Container $checked={value}>
        {value ? "TRUE" : "FALSE"}
      </Styled.Container>
    </Styled.Root>
  )
}

export default StringInput
