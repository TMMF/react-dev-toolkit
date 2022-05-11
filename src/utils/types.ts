import React from "react"
import { FieldSize } from "./constants"

export type ControlState<Value extends unknown> = {
  control: React.ComponentType
  activated: boolean
  value: Value
}

export type DebugState = {
  [key in string]: ControlState<unknown>
}

export type FieldProps<Value> = {
  name?: string
  size?: FieldSize
  defaultValue?: Value

  value?: Value
  onChange?: (value: Value) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  ActionIcon?: JSX.Element
  onAction?: () => void

  // Non-essentials

  /*// TODO: build out these functionality
  // error?: string
  validation?: undefined // yup?
  transform?: (value: unknown) => unknown // transform mocked data to something else for output
  default?: unknown // default value to use instead of `undefined`
  merge?: boolean // for objects/tuples, merge fields or not

  // TODO: maybe put some of these options inside the control?
  // placeholder?*/
}

export type FieldComponent<Value> = React.ComponentType<FieldProps<Value>>

export type FieldElement<Value> = React.ReactElement<FieldProps<Value>>

export type TGetValue<FE> = FE extends FieldElement<infer Value> ? Value : never

export type TMap<Arr> = Arr extends readonly [infer Head, ...infer Rest]
  ? [TGetValue<Head>, ...TMap<Rest>]
  : []
