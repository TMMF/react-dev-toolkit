import * as React from "react"
import { useDebugField } from "./state"

const newControl = () => {
  const id = "Test-Field"

  const TestControl = () => {
    const [field, updateField] = useDebugField<string>(id)
    const onChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        updateField({ value: e.target.value }),
      [updateField],
    )

    return <input type="text" value={field?.value} onChange={onChange} />
  }
  TestControl.$$id = id

  return TestControl
}

/**
 * Default Controls TODO:
 * - String Input / Free-Text Input
 * - Number Input
 * - Dropdown Input
 * - Checkbox Input
 */

type ControlComponent = React.ComponentType<{ id: string }>

const StringControl: ControlComponent = (props) => {
  const [field, updateField] = useDebugField<string>(props.id)

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      updateField({ value: e.target.value }),
    [updateField],
  )

  return <input type="text" value={field.value} onChange={onChange} />
}

type Options = {
  title: string
  description?: string
  control: ControlComponent
  validation?: undefined // yup?
}

type Control = Options & {
  $$id: string
}

export const control = (options: Options): Control => {
  // TODO: this should probably be a symbol?
  const id = `TODO-generate-fn-${Math.round(Math.random() * 1000)}`

  return {
    $$id: id,
    ...options,
  }
}

// ---
