import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"

const Styled = {
  FieldHeader: styled.div`
    display: inline-flex;
    align-items: center;

    background-color: white;

    position: absolute;
    left: 10px;
    top: -8px;
    padding: 0 4px;
  `,
  FieldCheckbox: styled.input`
    margin: 0;
    margin-right: 4px;
    cursor: pointer;
  `,
  FieldTitle: styled.label`
    font-family: monospace;
    font-size: 14px;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  FieldControl: styled.div``,
  FieldError: styled.p`
    margin: 0;
    font-family: monospace;
    font-size: 12px;
    color: #ff6961;
    height: 8px;
  `,
  SmallField: styled.div`
    grid-column: span 1;
    position: relative;
    margin-top: 8px;
  `,
  MediumField: styled.div`
    grid-column: span 2;
    position: relative;
    margin-top: 8px;
  `,
  LargeField: styled.div`
    grid-column: span 3;
    position: relative;
    margin-top: 8px;
  `,
  Input: styled.input`
    width: 100%;
    padding: 8px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  `,
}

const getFieldFromSize = (size: FieldSize) => {
  switch (size) {
    case FieldSize.Small:
      return Styled.SmallField
    case FieldSize.Medium:
      return Styled.MediumField
    case FieldSize.Large:
      return Styled.LargeField
  }
}

type Props = {
  name: string
  size?: FieldSize
  value?: string
  onChange?: (value: string) => void
  checked?: boolean
  onCheck?: (checked: boolean) => void
  error?: string
}

export const StringField = (props: Props) => {
  const { name, size, value, onChange, checked, onCheck, error } = props

  const _onCheck = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onCheck?.(e.target.checked),
    [onCheck],
  )

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange],
  )

  const Field = getFieldFromSize(size ?? FieldSize.Medium)

  return (
    <Field>
      <Styled.FieldHeader>
        <Styled.FieldTitle>
          {checked != null && onCheck != null ? (
            <Styled.FieldCheckbox
              type="checkbox"
              checked={checked}
              onChange={_onCheck}
            />
          ) : null}
          {name}
        </Styled.FieldTitle>
      </Styled.FieldHeader>
      <Styled.FieldControl>
        <Styled.Input type="text" value={value ?? ""} onChange={_onChange} />
      </Styled.FieldControl>
      {error ? <Styled.FieldError>{error}</Styled.FieldError> : null}
    </Field>
  )
}

export default StringField
