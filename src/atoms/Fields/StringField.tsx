import * as React from "react"

import { FieldSize } from "../../utils/constants"

import StringInput from "./Inputs/StringInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

type Props = {
  name: string
  size?: FieldSize
  value?: string
  onChange?: (value: string) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string

  Icon?: JSX.Element
  onAction?: () => void
}

export const StringField = (props: Props) => {
  const {
    name,
    size,
    value,
    onChange,
    checked,
    onCheck,
    error,
    Icon,
    onAction,
  } = props

  const hasError = !!error
  return (
    <FieldContainer
      size={size ?? FieldSize.Medium}
      Icon={Icon}
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
