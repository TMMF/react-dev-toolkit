import * as React from "react"

import { FieldSize } from "../../utils/constants"

import BooleanInput from "./Inputs/BooleanInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

type Props = {
  name: string
  size?: FieldSize
  value?: boolean
  onChange?: (value: boolean) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string
}

export const BooleanField = (props: Props) => {
  const { name, size, value, onChange, checked, onCheck, error } = props

  const hasError = !!error
  return (
    <FieldContainer size={size ?? FieldSize.Small}>
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      <BooleanInput value={value} onChange={onChange} hasError={hasError} />
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default BooleanField
