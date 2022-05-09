import * as React from "react"

import { FieldSize } from "../../utils/constants"
import { FieldProps } from "../../utils/types"

import NumberInput from "./Inputs/NumberInput"
import Field from "./Field"

export const NumberField = (props: FieldProps<number>) => {
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
      <NumberInput value={value} onChange={onChange} hasError={hasError} />
    </Field>
  )
}

export default NumberField
