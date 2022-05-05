import * as React from "react"
import styled from "styled-components"
import { useStore, useField } from "./state"
import Fields from "../atoms/Fields"
import Field from "../atoms/Field"
import { FieldSize } from "../utils/constants"

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

export const ObjectControl =
  (
    controls: Record<string, ControlComponent>,
  ): ControlComponent<Record<string, any>> =>
  (props) => {
    const { value, onChange } = props
    const _value = value ?? {}

    const onFieldChange = React.useCallback(
      (field: string) => (fieldValue: unknown) =>
        onChange({ ..._value, [field]: fieldValue }),
      [onChange],
    )

    return (
      <Fields showBorder>
        {Object.entries(controls).map(([name, Control]) => {
          return (
            <Field
              key={name}
              title={name}
              size={getSize(Control)}
              Control={() => (
                <Control value={_value[name]} onChange={onFieldChange(name)} />
              )}
            />
          )
        })}
      </Fields>
    )
  }

// TODO: Plus icon + delete icon to add/remove from list
export const ArrayControl = undefined

// TODO: type this so that the control === Default === transform
export type Options = {
  title: string
  description?: string
  control: ControlComponent
  size?: FieldSize

  // TODO: build out these functionality
  validation?: undefined // yup?
  transform?: (value: unknown) => unknown // transform mocked data to something else for output
  default?: unknown // default value to use instead of `undefined`
  merge?: boolean // for objects/tuples, merge fields or not
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
    return FieldSize.Large
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
