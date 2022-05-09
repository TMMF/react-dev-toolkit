import React from "react"
import { FieldSize } from "./constants"

export type FieldProps<Value> = {
  name: string
  size?: FieldSize
  error?: string

  value?: Value
  onChange?: (value: Value) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  ActionIcon?: JSX.Element
  onAction?: () => void
}

export type FieldComponent<Value> = React.ComponentType<FieldProps<Value>>
