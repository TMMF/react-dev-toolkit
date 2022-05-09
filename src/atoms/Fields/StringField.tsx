import * as React from "react"

import { FieldSize } from "../../utils/constants"
import { FieldProps } from "../../utils/types"

import StringInput from "./Inputs/StringInput"
import Field from "./Field"

export const StringField = (props: FieldProps<string>) => {
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
      size={size ?? FieldSize.Medium}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
      error={error}
    >
      <StringInput value={value} onChange={onChange} hasError={hasError} />
    </Field>
  )
}

export default StringField
