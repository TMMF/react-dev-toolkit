import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement } from "../../utils/types"

import { ContainerStyle, AutocompleteProps } from "./shared"
import Field from "../Field"

const Styled = {
  Root: styled.div``,
  Input: styled.input`
    appearance: none;
    margin: 0;
    height: 35px;
    background-color: white;

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

export const BooleanField = (
  props: FieldProps<boolean>,
): FieldElement<boolean> => {
  const {
    name,
    size,
    value,
    onChange,
    checked,
    onCheck,
    ActionIcon,
    onAction,
  } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked),
    [onChange],
  )

  return (
    <Field
      name={name}
      size={size ?? FieldSize.Small}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
    >
      <Styled.Root>
        <Styled.Input
          type="checkbox"
          checked={value ?? false}
          onChange={_onChange}
          {...AutocompleteProps}
        />
        <Styled.Container $checked={value}>
          {value ? "TRUE" : "FALSE"}
        </Styled.Container>
      </Styled.Root>
    </Field>
  )
}

export default BooleanField
