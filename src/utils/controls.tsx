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

/*
IDEA:
GroupControl({
  fieldName: StringControl(validationOptions),
  ...
}) -> GroupedField with each of the controls within it auto-organized
 */

export type Options = {
  title: string
  description?: string
  control: ControlComponent
  validation?: undefined // yup?
}

export type Control = Omit<Options, "control"> & {
  $$id: string
  control: React.ComponentType
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

  const result = {
    ...options,
    $$id: id,
    control: ControlWrapper,
  }

  useStore.setState((state) => ({
    ...state,
    [id]: {
      ...result,
      activated: false,
      value: undefined,
    },
  }))

  return <Value extends unknown>(value: Value) => {
    const [field] = useField<Value>(id)
    return field?.activated ? field.value : value
  }
}
