import * as React from "react"
import { useStore, useField } from "./state"
import {
  FieldElement,
  FieldProps,
  TGetValue,
  TMap,
  ControlState,
  Hook,
  Api,
  Dev,
} from "./types"

import StringField from "../atoms/Fields/StringField"
import NumberField from "../atoms/Fields/NumberField"
import BooleanField from "../atoms/Fields/BooleanField"
import SelectField, { SelectFieldProps } from "../atoms/Fields/SelectField"
import ObjectField, { ObjectFieldProps } from "../atoms/Fields/ObjectField"
import TupleField, { TupleFieldProps } from "../atoms/Fields/TupleField"
import ArrayField, { ArrayFieldProps } from "../atoms/Fields/ArrayField"

export const StringControl = (
  props: FieldProps<string> = {},
): FieldElement<string> => <StringField {...props} />

export const NumberControl = (
  props: FieldProps<number> = {},
): FieldElement<number> => <NumberField {...props} />

export const BooleanControl = (
  props: FieldProps<boolean> = {},
): FieldElement<boolean> => <BooleanField {...props} />

export const SelectControl = <Value extends string>(
  props: SelectFieldProps<Value>,
): FieldElement<Value> => <SelectField {...props} />

export const ObjectControl = <
  Fields extends { [key in string]?: FieldElement<any> },
  Value extends { [field in keyof Fields]?: TGetValue<Fields[field]> },
>(
  props: ObjectFieldProps<Fields, Value>,
): FieldElement<Value> => <ObjectField {...props} />

export const TupleControl = <
  Fields extends readonly FieldElement<any>[],
  Value extends TMap<Fields>,
>(
  props: TupleFieldProps<Fields, Value>,
): FieldElement<Value> => <TupleField {...props} />

export const ArrayControl = <Value extends unknown, Values extends Value[]>(
  props: ArrayFieldProps<Value, Values>,
): FieldElement<Values> => <ArrayField {...props} />

// ---

export const dev = <Value extends unknown>(
  element: FieldElement<Value>,
): Dev<Value> => {
  const id = `dev-control-${Math.round(Math.random() * 1000)}`

  // Wrap the field to control the value and set props
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

    return React.cloneElement(element, {
      name: element.props.name,
      size: element.props.size,
      value: field.value as Value,
      onChange: onChange,
      checked: field.activated,
      onCheck: onCheck,
    })
  })

  // Add the field to state
  useStore.setState((state) => ({
    ...state,
    [id]: {
      control: ControlWrapper,
      activated: false,
      value: element.props.defaultValue ?? null,
    },
  }))

  // Creates the main hook for controls
  const useDevHook: Hook<Value> = (value) => {
    const [field] = useField<Value>(id)
    return field?.activated ? field.value : value
  }

  // Creates API methods for use outside of react components
  const api: Api<Value> = {
    getValue: (value) => {
      const field = useStore.getState()[id] as ControlState<Value>
      return field.activated ? field.value : value
    },
    setValue: (value) => {
      useStore.setState((state) => ({
        ...state,
        [id]: {
          ...state[id],
          value,
        },
      }))
    },
    subscribe: (listener) => {
      return useStore.subscribe((state) => state[id].value as Value, listener)
    },
    isMocked: () => {
      const field = useStore.getState()[id] as ControlState<Value>
      return field.activated
    },
    setMocked: (mocked) => {
      useStore.setState((state) => ({
        ...state,
        [id]: {
          ...state[id],
          activated: mocked,
        },
      }))
    },
    subscribeMocked: (listener) => {
      return useStore.subscribe((state) => state[id].activated, listener)
    },
  }

  // Return the combo of the hook and the api
  return Object.assign(useDevHook, api)
}
