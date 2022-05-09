import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldComponent } from "../../utils/types"

import Field from "./Field"

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

type Array = unknown[]
interface TupleFieldProps<Value extends Array> extends FieldProps<Value> {
  // TODO: improve this typing
  fields: FieldComponent<any>[]
}

export const TupleField = <Value extends Array>(
  props: TupleFieldProps<Value>,
) => {
  const {
    name,
    fields,
    size,
    value,
    onChange,
    checked,
    onCheck,
    error,
    ActionIcon,
    onAction,
  } = props

  const hasError = !!error
  return (
    <Field
      name={name}
      size={size ?? FieldSize.Large}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
      error={error}
    >
      <Styled.Fields>
        {fields.map((Field, idx) => (
          <Field
            key={idx}
            name={`Index ${idx}`}
            value={value?.[idx]}
            onChange={(val) => {
              if (value && onChange) {
                onChange([
                  ...value.slice(0, idx),
                  val,
                  ...value.slice(idx + 1),
                ] as Value)
              }
            }}
            // TODO: figure out somehow
            error=""
          />
        ))}
      </Styled.Fields>
    </Field>
  )
}

export default TupleField
