import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement } from "../../utils/types"

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

type Object = Record<string, unknown>
interface ObjectFieldProps<Value extends Object> extends FieldProps<Value> {
  // TODO: improve this typing
  fields: Record<string, FieldElement<any>>
}

export const ObjectField = <Value extends Object>(
  props: ObjectFieldProps<Value>,
): FieldElement<Value> => {
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
        {Object.entries(fields).map(([fieldName, field], idx) => {
          return React.cloneElement(field, {
            // Add defaults to props
            name: field.props.name ?? fieldName,

            // Override props
            error: field.props.error, // TODO: build out error logic / validation
            value: value?.[fieldName],
            onChange: (val: unknown) => {
              onChange?.({ ...value, [fieldName]: val } as Value)
            },

            // Clear props
            checked: undefined,
            onCheck: undefined,
            ActionIcon: undefined,
            onAction: undefined,

            // Add props
            key: fieldName,
          })
        })}
      </Styled.Fields>
    </Field>
  )
}

export default ObjectField
