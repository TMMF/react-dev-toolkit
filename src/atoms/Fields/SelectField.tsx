import * as React from "react"

import { FieldSize } from "../../utils/constants"
import { FieldProps } from "../../utils/types"

import SelectInput from "./Inputs/SelectInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

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
    <FieldContainer
      size={size ?? FieldSize.Small}
      ActionIcon={ActionIcon}
      onAction={onAction}
    >
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      <SelectInput value={value} onChange={onChange} hasError={hasError} />
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default SelectField
