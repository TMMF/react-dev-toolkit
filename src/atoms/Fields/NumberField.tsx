import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement } from "../../utils/types"

import { ContainerStyle, AutocompleteProps } from "./shared"
import Field from "./Field"

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

export const NumberField = (
  props: FieldProps<number>,
): FieldElement<number> => {
  const {
    name,
    size,
    value,
    onChange,
    checked,
    onCheck,
    error,
    ActionIcon,
    onAction,
  } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(e.target.valueAsNumber),
    [onChange, value],
  )

  const hasError = !!error
  return (
    <Field
      name={name}
      size={size ?? FieldSize.Small}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
      error={error}
    >
      <Styled.Input
        type="number"
        value={value?.toString() ?? ""}
        onChange={_onChange}
        $hasError={hasError}
        {...AutocompleteProps}
      />
    </Field>
  )
}

export default NumberField
