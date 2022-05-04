import * as React from "react"
import styled from "styled-components"
import { useStore, useField } from "./state"

const Styled = {
  Input: styled.input`
    width: 100%;
  `,
}

/**
 * Default Controls TODO:
 * - String Input / Free-Text Input
 * - Number Input
 * - Dropdown Input
 * - Checkbox Input
 */

type ControlComponent<Value = any> = React.ComponentType<{
  value: Value
  onChange: (value: Value) => void
}>

export const StringControl: ControlComponent<string> = (props) => {
  const { value, onChange } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  )

  return <Styled.Input type="text" value={value ?? ""} onChange={_onChange} />
}

// TODO: allow for default number instead of undefined
export const NumberControl: ControlComponent<number | undefined> = (props) => {
  const { value, onChange } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value ? Number(e.target.value) : undefined),
    [onChange],
  )

  return <Styled.Input type="number" value={value ?? ""} onChange={_onChange} />
}

/*
IDEA:
GroupControl({
  fieldName: StringControl(validationOptions),
  ...
}) -> GroupedField with each of the controls within it auto-organized
 */

export enum FieldSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type Options = {
  title: string
  description?: string
  control: ControlComponent
  validation?: undefined // yup?
  size?: FieldSize
}

export type Control = Omit<Options, "control"> & {
  $$id: string
  control: React.ComponentType
  size: FieldSize
}

const getSize = (component: ControlComponent, size?: FieldSize): FieldSize => {
  if (size != null) {
    return size
  }

  // Defaults
  if (component === StringControl) {
    return FieldSize.Medium
  } else if (component === NumberControl) {
    return FieldSize.Small
  } else {
    return FieldSize.Small
  }
}

export const dev = (options: Options) => {
  // TODO: this should probably be a symbol?
  const id = `TODO-generate-fn-${Math.round(Math.random() * 1000)}`

  const ControlWrapper = React.memo(() => {
    const [field, updateField] = useField(id)

    const onChange = React.useCallback(
      (value: unknown) => updateField({ value }),
      [updateField],
    )

    return <options.control value={field.value} onChange={onChange} />
  })

  const size = getSize(options.control, options.size)

  const result = {
    ...options,
    $$id: id,
    control: ControlWrapper,
    size,
  }

  useStore.setState((state) => ({
    ...state,
    [id]: {
      ...result,
      activated: false,
      value: undefined,
    },
  }))

  // TODO: the typed value here should extend from the type that the control allows
  return <Value extends unknown>(value: Value) => {
    const [field] = useField<Value>(id)
    return field?.activated ? field.value : value
  }
}
