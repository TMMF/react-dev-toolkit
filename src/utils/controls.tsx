import * as React from "react"
import styled from "styled-components"
import { useStore, useField } from "./state"
import FieldGroup from "../atoms/FieldGroup"
import FieldSet from "../atoms/FieldSet"
import Field from "../atoms/Field"
import { FieldSize } from "../utils/constants"

const Styled = {
  Input: styled.input`
    width: 100%;
    padding: 8px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  `,
  Select: styled.select`
    width: 100%;
  `,
}

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

export const BooleanControl: ControlComponent<boolean> = (props) => {
  const { value, onChange } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked),
    [onChange],
  )

  return (
    <Styled.Input
      type="checkbox"
      checked={value ?? false}
      onChange={_onChange}
    />
  )
}

export const SelectControl =
  (values: unknown[]): ControlComponent<unknown> =>
  (props) => {
    const { value, onChange } = props

    const _onChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(values[e.target.options.selectedIndex]),
      [onChange],
    )

    return (
      <Styled.Select value={value} onChange={_onChange}>
        {values.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </Styled.Select>
    )
  }

export const ObjectControl = (
  controls: Record<string, ControlComponent>,
): ControlComponent<Record<string, any>> => {
  const _controls = Object.entries(controls)

  return (props) => {
    const { value, onChange } = props
    const _value = value ?? {}

    const onFieldChange = React.useCallback(
      (field: string) => (fieldValue: unknown) =>
        onChange({ ..._value, [field]: fieldValue }),
      [onChange, _value],
    )

    return (
      <FieldGroup>
        {_controls.map(([name, Control]) => {
          return (
            <Field
              key={name}
              title={name}
              size={getSize(Control)}
              control={
                <Control value={_value[name]} onChange={onFieldChange(name)} />
              }
            />
          )
        })}
      </FieldGroup>
    )
  }
}

export const ArrayControl =
  (Control: ControlComponent): ControlComponent<any[]> =>
  (props) => {
    const { value, onChange } = props
    const _value = value ?? []

    const onIdxChange = React.useCallback(
      (idx: number) => (fieldValue: unknown) =>
        onChange([
          ..._value.slice(0, idx),
          fieldValue,
          ..._value.slice(idx + 1),
        ]),
      [onChange, _value],
    )

    const onDelete = React.useCallback(
      (idx: number) => () =>
        onChange([..._value.slice(0, idx), ..._value.slice(idx + 1)]),
      [onChange, _value],
    )

    const onAdd = React.useCallback(
      () => onChange([..._value, undefined]),
      [onChange, _value],
    )

    return (
      <FieldSet>
        {_value.map((val, idx) => (
          <>
            <Field
              key={idx}
              title={`TODO-${idx}`}
              size={getSize(Control)}
              control={<Control value={val} onChange={onIdxChange(idx)} />}
            />
            <button onClick={onDelete(idx)}>Delete</button>
          </>
        ))}
        <button onClick={onAdd}>Add</button>
      </FieldSet>
    )
  }

export const TupleControl =
  (controls: ControlComponent[]): ControlComponent<any[]> =>
  (props) => {
    const { value, onChange } = props
    const _value = value ?? new Array(controls.length).fill(undefined)

    const onIdxChange = React.useCallback(
      (idx: number) => (fieldValue: unknown) =>
        onChange([
          ..._value.slice(0, idx),
          fieldValue,
          ..._value.slice(idx + 1),
        ]),
      [onChange, _value],
    )

    return (
      <FieldSet>
        {controls.map((Control, idx) => (
          <Field
            key={idx}
            title={`TODO-${idx}`}
            size={getSize(Control)}
            control={
              <Control value={_value[idx]} onChange={onIdxChange(idx)} />
            }
          />
        ))}
      </FieldSet>
    )
  }

// Each of these is a type on `input` element
export const DateControl = undefined
export const TimeControl = undefined
export const DateTimeControl = undefined
export const ColorControl = undefined
export const EmailControl = undefined
export const TelephoneControl = undefined
export const UrlControl = undefined

// TODO: maybe not for MVP
export const UnionControl = undefined

// ---
// ---
// ---

// TODO: type this so that the control === Default === transform
export type Options = {
  title: string
  control: ControlComponent
  size?: FieldSize

  // TODO: build out these functionality
  validation?: undefined // yup?
  transform?: (value: unknown) => unknown // transform mocked data to something else for output
  default?: unknown // default value to use instead of `undefined`
  merge?: boolean // for objects/tuples, merge fields or not

  // TODO: maybe put some of these options inside the control?
  // placeholder?
}

export type Control = Omit<Options, "control"> & {
  $$id: string
  control: React.ComponentType
  size: FieldSize
}

// TODO: change logic for determining default size
const getSize = (component: ControlComponent, size?: FieldSize): FieldSize => {
  if (size != null) {
    return size
  }

  // Defaults
  if (component === StringControl) {
    return FieldSize.Medium
  } else if (component === NumberControl) {
    return FieldSize.Small
  } else if (component === BooleanControl) {
    return FieldSize.Small
  } else if (component === SelectControl) {
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
