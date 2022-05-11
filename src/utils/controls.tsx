import * as React from "react"
import { useStore, useField } from "./state"
import { FieldElement, FieldProps, TGetValue, TMap } from "./types"

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

export const dev = <Value extends unknown>(element: FieldElement<Value>) => {
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

    return React.cloneElement(element, {
      name: element.props.name,
      size: element.props.size,
      value: field.value as Value,
      onChange: onChange,
      checked: field.activated,
      onCheck: onCheck,
      error: undefined, // TODO: figure out validation stuff
    })
  })

  useStore.setState((state) => ({
    ...state,
    [id]: {
      control: ControlWrapper,
      activated: false,
      value: element.props.defaultValue ?? null,
    },
  }))

  return (value: Value): Value | null => {
    const [field] = useField<Value>(id)
    return field?.activated ? field.value : value
  }
}
