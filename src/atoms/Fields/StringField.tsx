import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement } from "../../utils/types"

import { ContainerStyle, AutocompleteProps } from "./shared"
import Field from "./Field"

const Styled = {
  Input: styled.input`
    ${ContainerStyle};
  `,
}

export const StringField = (
  props: FieldProps<string>,
): FieldElement<string> => {
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
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange],
  )

  const hasError = !!error
  return (
    <Field
      name={name}
      size={size ?? FieldSize.Medium}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
      error={error}
    >
      <Styled.Input
        type="text"
        value={value}
        onChange={_onChange}
        $hasError={hasError}
        {...AutocompleteProps}
      />
    </Field>
  )
}

export default StringField
