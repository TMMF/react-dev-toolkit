import * as React from "react"

import { FieldSize } from "../../utils/constants"
import { FieldComponent } from "../../utils/types"

import StringInput from "./Inputs/StringInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

export const StringField: FieldComponent<string> = (props) => {
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
      size={size ?? FieldSize.Medium}
      ActionIcon={ActionIcon}
      onAction={onAction}
    >
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      <StringInput value={value} onChange={onChange} hasError={hasError} />
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default StringField
