import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldComponent } from "../../utils/types"
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

type Array = unknown[]
interface ArrayFieldProps<Value extends Array> extends FieldProps<Value> {
  // TODO: improve this typing
  FieldComp: FieldComponent<any>
}

export const ArrayField = <Value extends unknown[]>(
  props: ArrayFieldProps<Value>,
) => {
  const {
    name,
    FieldComp,
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
    if (value && onChange) {
      onChange([...value, ""] as Value)
    }

    // Place in a timeout to have the render happen before the scrolling
    setTimeout(() => {
      ref.current?.scrollTo(0, ref.current.scrollHeight)
    })
  }, [onChange, value])

  const onDelete = React.useCallback(
    (idx: number) => () => {
      if (value && onChange) {
        onChange([...value.slice(0, idx), ...value.slice(idx + 1)] as Value)
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
        {value?.map((_, idx) => (
          <FieldComp
            key={idx}
            name={`Index ${idx}`}
            value={value[idx]}
            onChange={(val) =>
              onChange?.([
                ...value.slice(0, idx),
                val,
                ...value.slice(idx + 1),
              ] as Value)
            }
            ActionIcon={<SquareMinusIcon />}
            onAction={onDelete(idx)}
            // TODO: figure out somehow
            error=""
          />
        ))}
        <Styled.IconButton Icon={<SquarePlusIcon />} onClick={onAdd} />
      </Styled.Fields>
    </Styled.Field>
  )
}

export default ArrayField