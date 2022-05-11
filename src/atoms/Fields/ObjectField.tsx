import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement, TGetValue } from "../../utils/types"

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

export interface ObjectFieldProps<
  Fields extends { [key in string]?: FieldElement<any> },
  Value extends { [field in keyof Fields]?: TGetValue<Fields[field]> },
> extends FieldProps<Value> {
  fields: Fields
}

export const ObjectField = <
  Fields extends { [key in string]?: FieldElement<any> },
  Value extends { [field in keyof Fields]?: TGetValue<Fields[field]> },
>(
  props: ObjectFieldProps<Fields, Value>,
): FieldElement<Value> => {
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
        {Object.entries(fields as Record<string, FieldElement<unknown>>).map(
          ([fieldName, field], idx) => {
            return React.cloneElement(field, {
              // Add defaults to props
              name: field.props.name ?? fieldName,

              // Override props
              value: value?.[fieldName as keyof Value],
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
          },
        )}
      </Styled.Fields>
    </Field>
  )
}

export default ObjectField
