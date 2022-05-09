import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldComponent } from "../../utils/types"

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
interface ObjectFieldProps<Value extends Object> extends FieldProps<Value> {
  // TODO: improve this typing
  fields: Record<string, FieldComponent<any>>
}

export const ObjectField = <Value extends Object>(
  props: ObjectFieldProps<Value>,
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
    <FieldContainer
      size={size ?? FieldSize.Large}
      ActionIcon={ActionIcon}
      onAction={onAction}
    >
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      <Styled.Fields>
        {Object.entries(fields).map(([fieldName, Field]) => (
          <Field
            key={fieldName}
            name={fieldName}
            value={value?.[fieldName]}
            onChange={(val) =>
              onChange?.({ ...value, [fieldName]: val } as Value)
            }
            // TODO: figure out somehow
            error=""
          />
        ))}
      </Styled.Fields>
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default ObjectField
