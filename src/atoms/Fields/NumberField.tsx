import * as React from "react"

import { FieldSize } from "../../utils/constants"

import NumberInput from "./Inputs/NumberInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

type Props = {
  name: string
  size?: FieldSize
  value?: number
  onChange?: (value: number) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string

  Icon?: JSX.Element
  onAction?: () => void
}

export const NumberField = (props: Props) => {
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
      size={size ?? FieldSize.Small}
      Icon={Icon}
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
