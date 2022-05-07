import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"

import StringField from "./StringField"
import NumberField from "./NumberField"
import BooleanField from "./BooleanField"
import SelectField from "./SelectField"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

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

type Field =
  | typeof StringField
  | typeof NumberField
  | typeof BooleanField
  | typeof SelectField
  | typeof TupleField

type Props<Value extends unknown[]> = {
  name: string
  fields: Field[]
  size?: FieldSize
  value?: Value
  onChange?: (value: Value) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string
}

export const TupleField = <Value extends unknown[]>(props: Props<Value>) => {
  const { name, fields, size, value, onChange, checked, onCheck, error } = props

  const hasError = !!error
  return (
    <FieldContainer size={size ?? FieldSize.Large}>
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      <Styled.Fields>
        {fields.map((Field, idx) => (
          <Field
            key={idx}
            name={`Index ${idx}`}
            value={value[idx]}
            onChange={(val) =>
              onChange([...value?.slice(0, idx), val, ...value?.slice(idx + 1)])
            }
            error=""
          />
        ))}
      </Styled.Fields>
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default TupleField
