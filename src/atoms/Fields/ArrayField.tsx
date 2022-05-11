import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement } from "../../utils/types"
import { SquarePlusIcon, SquareMinusIcon } from "../Icons"
import IconButton from "../IconButton"

import Field from "./Field"

const Styled = {
  Field: styled(Field)`
    & > label {
      z-index: 1;
    }
  `,
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

    max-height: 150px;
    overflow: auto;
    scroll-behavior: smooth;
  `,
  IconButton: styled(IconButton)`
    border: 1px dashed #aaaaaa;
    border-radius: 4px;
    margin-top: 8px;
    padding: 4px;
  `,
}

export interface ArrayFieldProps<Value extends unknown, Values extends Value[]>
  extends FieldProps<Values> {
  field: FieldElement<Value>
}

export const ArrayField = <Value extends unknown, Values extends Value[]>(
  props: ArrayFieldProps<Value, Values>,
) => {
  const {
    name,
    field,
    size,
    value,
    onChange,
    checked,
    onCheck,
    error,
    ActionIcon,
    onAction,
  } = props

  const ref = React.useRef<HTMLDivElement>(null)

  const onAdd = React.useCallback(() => {
    // TODO: this should fill with the default for whatever field passed in
    if (onChange) {
      const _value = value ?? []
      onChange([..._value, ""] as Values)
    }

    // Place in a timeout to have the render happen before the scrolling
    setTimeout(() => {
      ref.current?.scrollTo(0, ref.current.scrollHeight)
    })
  }, [onChange, value])

  const onDelete = React.useCallback(
    (idx: number) => () => {
      if (onChange) {
        const _value = value ?? []
        onChange([..._value.slice(0, idx), ..._value.slice(idx + 1)] as Values)
      }
    },
    [onChange, value],
  )

  const hasError = !!error
  return (
    <Styled.Field
      name={name}
      size={size ?? FieldSize.Large}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
      error={error}
    >
      <Styled.Fields ref={ref}>
        {value?.map((_, idx) => {
          return React.cloneElement(field, {
            // Override props
            name: `Index ${idx}`,
            error: field.props.error, // TODO: build out error logic / validation
            value: value[idx],
            onChange: (val: unknown) => {
              const _value = value ?? []
              onChange?.([
                ..._value.slice(0, idx),
                val,
                ..._value.slice(idx + 1),
              ] as Values)
            },
            ActionIcon: <SquareMinusIcon />,
            onAction: onDelete(idx),

            // Clear props
            checked: undefined,
            onCheck: undefined,

            // Add props
            key: idx,
          })
        })}
        <Styled.IconButton Icon={<SquarePlusIcon />} onClick={onAdd} />
      </Styled.Fields>
    </Styled.Field>
  )
}

export default ArrayField
