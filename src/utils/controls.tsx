import * as React from "react"
import { useStore, useField } from "./state"
import { FieldElement } from "./types"
import { FieldSize } from "./constants"

// TODO: move to types file
export type DevOptions = {
  title: string
  control: FieldElement<any> // TODO: better typing
  size?: FieldSize

  /*// TODO: build out these functionality
  validation?: undefined // yup?
  transform?: (value: unknown) => unknown // transform mocked data to something else for output
  default?: unknown // default value to use instead of `undefined`
  merge?: boolean // for objects/tuples, merge fields or not

  // TODO: maybe put some of these options inside the control?
  // placeholder?*/
}

export type DevControl = {
  $$id: string
  control: React.ComponentType
}

// ---
// ---
// ---

export const dev = (options: DevOptions) => {
  // TODO: this should probably be a symbol?
  // TODO: need to make this persist between hot reloading to prevent doubling
  const id = `TODO-generate-fn-${Math.round(Math.random() * 1000)}`

  const ControlWrapper = React.memo(() => {
    const [field, updateField] = useField(id)

    const onChange = React.useCallback(
      (value: unknown) => updateField({ value }),
      [updateField],
    )

    const onCheck = React.useCallback(
      (checked: boolean) => updateField({ activated: checked }),
      [updateField],
    )

    return React.cloneElement(options.control, {
      name: options.title ?? options.control.props.name,
      size: options.size ?? options.control.props.size,
      value: field.value,
      onChange: onChange,
      checked: field.activated,
      onCheck: onCheck,
      error: undefined, // TODO: figure out validation stuff
    })
  })

  const result: DevControl = {
    $$id: id,
    control: ControlWrapper,
  }

  useStore.setState((state) => ({
    ...state,
    [id]: {
      ...result,
      activated: false,
      value: null, // TODO: figure out default values
    },
  }))

  // TODO: the typed value here should extend from the type that the control allows
  return <Value extends unknown>(value: Value) => {
    const [field] = useField<Value>(id)
    return field?.activated ? field.value : value
  }
}
