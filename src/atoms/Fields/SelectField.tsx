import * as React from "react"

import { FieldSize } from "../../utils/constants"

import SelectInput from "./Inputs/SelectInput"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

type Props<Values extends string> = {
  name: string
  size?: FieldSize
  value?: Values
  onChange?: (value: Values) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string

  Icon?: JSX.Element
  onAction?: () => void
}

export const SelectField = <Values extends string>(props: Props<Values>) => {
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
      <SelectInput value={value} onChange={onChange} hasError={hasError} />
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default SelectField
