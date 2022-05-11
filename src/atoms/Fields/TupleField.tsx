import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement, TMap } from "../../utils/types"

import Field from "../Field"

const Styled = {
  Fields: styled.div`
    padding: 8px;
    padding-top: 10px;
    font-size: 14px;
    font-family: monospace;

    border: 1px dashed #aaaaaa;
    border-radius: 4px;

    grid-column: span 3;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(30px, auto);
    gap: 8px 16px;
  `,
}

export interface TupleFieldProps<
  Fields extends readonly FieldElement<any>[],
  Value extends TMap<Fields>,
> extends FieldProps<Value> {
  fields: Fields
}

export const TupleField = <
  Fields extends readonly FieldElement<any>[],
  Value extends TMap<Fields>,
>(
  props: TupleFieldProps<Fields, Value>,
) => {
  const {
    name,
    fields,
    size,
    value,
    onChange,
    checked,
    onCheck,
    ActionIcon,
    onAction,
  } = props

  return (
    <Field
      name={name}
      size={size ?? FieldSize.Large}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
    >
      <Styled.Fields>
        {fields.map((field, idx) => {
          return React.cloneElement(field, {
            // Add defaults to props
            name: field.props.name ?? `Index ${idx}`,

            // Override props
            value: value?.[idx],
            onChange: (val: unknown) => {
              if (onChange) {
                const _value = value ?? []
                onChange([
                  ..._value.slice(0, idx),
                  val,
                  ..._value.slice(idx + 1),
                ] as Value)
              }
            },

            // Clear props
            checked: undefined,
            onCheck: undefined,
            ActionIcon: undefined,
            onAction: undefined,

            // Add props
            key: idx,
          })
        })}
      </Styled.Fields>
    </Field>
  )
}

export default TupleField
