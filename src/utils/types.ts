import React from "react"
import { FieldSize } from "./constants"

export type FieldProps<Value> = {
  name?: string // TODO: This should be required in the control component (`dev`)
  size?: FieldSize
  error?: string
  // TODO: add default here? or in control?

  value?: Value
  onChange?: (value: Value) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  ActionIcon?: JSX.Element
  onAction?: () => void
}

export type FieldComponent<Value> = React.ComponentType<FieldProps<Value>>

export type FieldElement<Value> = React.ReactElement<FieldProps<Value>>
