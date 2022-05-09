import * as React from "react"

import { FieldSize } from "../../utils/constants"
import { FieldComponent } from "../../utils/types"

import NumberInput from "./Inputs/NumberInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

export const NumberField: FieldComponent<number> = (props) => {
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
      <NumberInput value={value} onChange={onChange} hasError={hasError} />
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default NumberField
