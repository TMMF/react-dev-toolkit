import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../utils/constants"

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
}

type Props = {
  title: string
  size: FieldSize
  checked?: boolean
  onClickCheckbox?: (checked: boolean) => void
  control: JSX.Element
  error?: string
}

export const Field = (props: Props) => {
  const { title, size, checked, onClickCheckbox, control, error } = props

  const _onClickCheckbox = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onClickCheckbox?.(e.target.checked),
    [onClickCheckbox],
  )

  const Field =
    size === FieldSize.Large
      ? Styled.LargeField
      : size === FieldSize.Medium
      ? Styled.MediumField
      : Styled.SmallField

  return (
    <Field>
      <Styled.FieldHeader>
        <Styled.FieldTitle>
          {checked != null && onClickCheckbox != null ? (
            <Styled.FieldCheckbox
              type="checkbox"
              checked={checked}
              onChange={_onClickCheckbox}
            />
          ) : null}
          {title}
        </Styled.FieldTitle>
      </Styled.FieldHeader>
      <Styled.FieldControl>{control}</Styled.FieldControl>
      {error ? <Styled.FieldError>{error}</Styled.FieldError> : null}
    </Field>
  )
}

export default Field
