import * as React from "react"
import styled from "styled-components"

import { HelpIcon } from "../atoms/Icons"
import { FieldSize } from "../utils/constants"

const Styled = {
  FieldHeader: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
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
  FieldHelp: styled(HelpIcon)`
    width: 16px;
    height: 16px;
    stroke-width: 3px;
    color: #b8b8b8;
    margin-left: 4px;
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
  `,
  MediumField: styled.div`
    grid-column: span 2;
  `,
  LargeField: styled.div`
    grid-column: span 3;
  `,
}

type Props = {
  title: string
  description?: string
  size: FieldSize
  checked?: boolean
  onClickCheckbox?: (checked: boolean) => void
  control: JSX.Element
  error?: string
}

export const Field = (props: Props) => {
  const { title, description, size, checked, onClickCheckbox, control, error } =
    props

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
        {description ? <Styled.FieldHelp /> : null}
      </Styled.FieldHeader>
      <Styled.FieldControl>{control}</Styled.FieldControl>
      {error ? <Styled.FieldError>{error}</Styled.FieldError> : null}
    </Field>
  )
}

export default Field
