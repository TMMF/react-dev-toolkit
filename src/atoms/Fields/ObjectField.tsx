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

type Object = Record<string, unknown>
type Field =
  | typeof StringField
  | typeof NumberField
  | typeof BooleanField
  | typeof SelectField
  | typeof ObjectField

type Props<Value extends Object> = {
  name: string
  fields: Record<string, Field>
  size?: FieldSize
  value?: Value
  onChange?: (value: Value) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string
}

export const ObjectField = <Value extends Object>(props: Props<Value>) => {
  const { name, fields, size, value, onChange, checked, onCheck, error } = props

  const hasError = !!error
  return (
    <FieldContainer size={size ?? FieldSize.Large}>
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      <Styled.Fields>
        {Object.entries(fields).map(([fieldName, Field]) => (
          <Field
            name={fieldName}
            value={value[fieldName]}
            onChange={(val) => onChange({ ...value, [fieldName]: val })}
            error=""
          />
        ))}
      </Styled.Fields>
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default ObjectField
