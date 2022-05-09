import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { SquarePlusIcon, SquareMinusIcon } from "../Icons"
import IconButton from "../IconButton"

import StringField from "./StringField"
import NumberField from "./NumberField"
import BooleanField from "./BooleanField"
import SelectField from "./SelectField"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

const Styled = {
  FieldTitle: styled(FieldTitle)`
    z-index: 1;
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
  Container: styled.div`
    display: inline-flex;
  `,
  IconButton: styled(IconButton)`
    border: 1px dashed #aaaaaa;
    border-radius: 4px;
    margin-top: 8px;
    padding: 4px;
  `,
}

// Define a generic field type and then have all field props extend from that. Then this is just React.ComponentType<FieldType>
type Field =
  | typeof StringField
  | typeof NumberField
  | typeof BooleanField
  | typeof SelectField
  | typeof ArrayField

type Props<Value extends unknown[]> = {
  name: string
  Field: Field
  size?: FieldSize
  value?: Value
  onChange?: (value: Value) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string
}

export const ArrayField = <Value extends unknown[]>(props: Props<Value>) => {
  const { name, Field, size, value, onChange, checked, onCheck, error } = props

  const ref = React.useRef<HTMLDivElement>(null)

  const onAdd = React.useCallback(() => {
    // TODO: this should fill with the default for whatever field passed in
    onChange?.([...value, ""])

    // Place in a timeout to have the render happen before the scrolling
    setTimeout(() => {
      ref.current?.scrollTo(0, ref.current.scrollHeight)
    })
  }, [onChange, value])

  const onDelete = React.useCallback(
    (idx: number) => () => {
      onChange?.([...value?.slice(0, idx), ...value?.slice(idx + 1)])
    },
    [onChange, value],
  )

  const hasError = !!error
  return (
    <FieldContainer size={size ?? FieldSize.Large}>
      <Styled.FieldTitle
        checked={checked}
        onCheck={onCheck}
        hasError={hasError}
      >
        {name}
      </Styled.FieldTitle>
      <Styled.Fields ref={ref}>
        {value.map((_, idx) => (
          <Field
            key={idx}
            name={`Index ${idx}`}
            value={value[idx]}
            onChange={(val) =>
              onChange([...value?.slice(0, idx), val, ...value?.slice(idx + 1)])
            }
            error=""
            Icon={<SquareMinusIcon />}
            onAction={onDelete(idx)}
          />
        ))}
        <Styled.IconButton Icon={<SquarePlusIcon />} onClick={onAdd} />
      </Styled.Fields>
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default ArrayField
