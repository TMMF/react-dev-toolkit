import * as React from "react"

import { FieldSize } from "../../utils/constants"
import { FieldProps } from "../../utils/types"

import SelectInput from "./Inputs/SelectInput"
import Field from "./Field"

export const SelectField = <Value extends string>(props: FieldProps<Value>) => {
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
      <SelectInput value={value} onChange={onChange} hasError={hasError} />
    </Field>
  )
}

export default SelectField
